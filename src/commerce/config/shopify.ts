import { validateEnv } from '../utils/env';

// Eagerly validate environment variables on module load
const env = validateEnv();

export const shopifyConfig = {
  domain: env.storeDomain,
  apiVersion: env.apiVersion,
  storefrontToken: env.storefrontToken,
  
  endpoints: {
    graphql: `${env.storeDomain}/api/${env.apiVersion}/graphql.json`,
  },
  
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': env.storefrontToken,
    'Accept': 'application/json'
  },
  
  client: {
    timeoutMs: 10000,
    maxRetries: 3,
    baseRetryDelayMs: 500
  }
} as const;
