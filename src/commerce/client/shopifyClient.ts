import { shopifyConfig } from '../config/shopify';
import { logger } from '../utils/logger';
import { NetworkError, AuthenticationError, GraphQLError, CommerceError } from '../errors';

type GraphQLResponse<T> = {
  data?: T;
  errors?: any[];
};

export class ShopifyClient {
  private static instance: ShopifyClient;
  
  private constructor() {}

  public static getInstance(): ShopifyClient {
    if (!ShopifyClient.instance) {
      ShopifyClient.instance = new ShopifyClient();
    }
    return ShopifyClient.instance;
  }

  /**
   * Executes a GraphQL query or mutation against the Shopify Storefront API.
   * Includes automatic retries, timeout management, and strict error mapping.
   */
  public async request<T = any>(
    operationName: string,
    query: string,
    variables?: Record<string, any>,
    cacheOptions?: { cache?: RequestCache; next?: NextFetchRequestConfig },
    attempt = 1
  ): Promise<T> {
    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), shopifyConfig.client.timeoutMs);

    try {
      const response = await fetch(shopifyConfig.endpoints.graphql, {
        method: 'POST',
        headers: shopifyConfig.headers,
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
        ...(cacheOptions?.cache && { cache: cacheOptions.cache }),
        ...(cacheOptions?.next && { next: cacheOptions.next }),
      });

      clearTimeout(timeoutId);

      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new AuthenticationError();
        }
        
        // Handle 429 Too Many Requests or 5xx server errors with retry
        if (response.status === 429 || response.status >= 500) {
          if (attempt <= shopifyConfig.client.maxRetries) {
            return this.handleRetry(operationName, query, variables, cacheOptions, attempt, response.status);
          }
        }
        
        throw new NetworkError(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const json = await response.json() as GraphQLResponse<T>;

      if (json.errors && json.errors.length > 0) {
        console.error('------------------------------------------------');
        console.error(`Operation name: ${operationName}`);
        console.error(`Variables:`, variables);
        console.error(`Entire GraphQL query:\n${query}`);
        console.error(`HTTP status: ${response.status}`);
        console.error(`Response JSON:`, JSON.stringify(json, null, 2));
        console.error(`GraphQL errors:`, JSON.stringify(json.errors, null, 2));
        
        json.errors.forEach((err: any, index: number) => {
          console.error(`Error [${index}] message: ${err.message}`);
          if (err.extensions) {
            console.error(`Extensions:`, JSON.stringify(err.extensions, null, 2));
            if (err.extensions.problems) {
              err.extensions.problems.forEach((problem: any) => {
                if (problem.path) {
                  console.error(`Validation error field path:`, problem.path);
                }
              });
            }
          }
        });
        console.error('------------------------------------------------');
        throw new GraphQLError(json.errors, `GraphQL errors in ${operationName}`);
      }

      if (!json.data) {
        throw new CommerceError(`No data returned from ${operationName}`);
      }

      logger.graphqlSuccess({ operationName, durationMs, status: response.status, retries: attempt - 1, variables });

      return json.data;

    } catch (error: any) {
      clearTimeout(timeoutId);
      
      const durationMs = Date.now() - startTime;

      // Check if it's an abort (timeout) or network failure
      if (error.name === 'AbortError' || (error.message && error.message.includes('fetch'))) {
        if (attempt <= shopifyConfig.client.maxRetries) {
          return this.handleRetry(operationName, query, variables, cacheOptions, attempt, 'Timeout/Network');
        }
        const finalError = new NetworkError(`Network or timeout error in ${operationName}`, error);
        logger.graphqlError({ operationName, durationMs, retries: attempt - 1, variables }, finalError);
        throw finalError;
      }

      // If it's already one of our custom errors, just rethrow
      if (error instanceof CommerceError) {
        logger.graphqlError({ operationName, durationMs, retries: attempt - 1, variables }, error);
        throw error;
      }

      const unexpectedError = new CommerceError('Unexpected error during GraphQL execution', error);
      logger.graphqlError({ operationName, durationMs, retries: attempt - 1, variables }, unexpectedError);
      throw unexpectedError;
    }
  }

  private async handleRetry(
    operationName: string, 
    query: string, 
    variables: Record<string, any> | undefined,
    cacheOptions: { cache?: RequestCache; next?: NextFetchRequestConfig } | undefined,
    attempt: number,
    status: number | string
  ): Promise<any> {
    const delay = shopifyConfig.client.baseRetryDelayMs * Math.pow(2, attempt - 1);
    logger.retry({ operationName, status, variables }, attempt, delay);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return this.request(operationName, query, variables, cacheOptions, attempt + 1);
  }
}

// Export the singleton instance for easy imports
export const shopifyClient = ShopifyClient.getInstance();
