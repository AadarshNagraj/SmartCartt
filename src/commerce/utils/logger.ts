/**
 * Development Logger designed for beautiful grouped output in the terminal/console.
 * Automatically silent in production environments.
 */

const IS_PROD = process.env.NODE_ENV === 'production';

type LogOptions = {
  operationName: string;
  durationMs?: number;
  status?: number | string;
  retries?: number;
  variables?: any;
};

export const logger = {
  info: (message: string, data?: any) => {
    if (IS_PROD) return;
    console.log(`[Shopify Info] ${message}`, data || '');
  },

  graphqlSuccess: (options: LogOptions) => {
    if (IS_PROD) return;
    
    // In browser, we can use console.group. In Node, we format text nicely.
    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      console.groupCollapsed(`%c[Shopify Request] %c${options.operationName}`, 'color: #10b981; font-weight: bold;', 'color: inherit;');
      console.log(`Duration: ${options.durationMs}ms`);
      console.log(`Status: ${options.status || 200}`);
      console.log(`Retries: ${options.retries || 0}`);
      if (options.variables) console.log('Variables:', options.variables);
      console.groupEnd();
    } else {
      console.log(
        `\x1b[32m[Shopify Request]\x1b[0m ${options.operationName} | ${options.durationMs}ms | Retries: ${options.retries || 0}`
      );
    }
  },

  graphqlError: (options: LogOptions, error: any) => {
    if (IS_PROD) return;

    const isBrowser = typeof window !== 'undefined';
    
    if (isBrowser) {
      console.group(`%c[Shopify Error] %c${options.operationName}`, 'color: #ef4444; font-weight: bold;', 'color: inherit;');
      console.log(`Status: ${options.status || 'Network/Timeout'}`);
      console.log(`Retries Attempted: ${options.retries || 0}`);
      if (options.variables) console.log('Variables:', options.variables);
      console.error('Error Details:', error);
      console.groupEnd();
    } else {
      console.log(
        `\x1b[31m[Shopify Error]\x1b[0m ${options.operationName} | Status: ${options.status || 'N/A'}`
      );
      console.error(error);
    }
  },

  retry: (options: LogOptions, attempt: number, delayMs: number) => {
    if (IS_PROD) return;
    console.log(`\x1b[33m[Shopify Retry]\x1b[0m ${options.operationName} | Attempt ${attempt} | Waiting ${delayMs}ms...`);
  }
};
