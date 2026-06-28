/**
 * Base error class for all commerce-related errors
 */
export class CommerceError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = 'CommerceError';
    Object.setPrototypeOf(this, CommerceError.prototype);
  }
}

/**
 * Thrown when the network request fails entirely (e.g. DNS, timeout, offline)
 */
export class NetworkError extends CommerceError {
  constructor(message: string, originalError?: unknown) {
    super(message, originalError);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Thrown when Shopify rejects authentication (401, 403)
 */
export class AuthenticationError extends CommerceError {
  constructor(message: string = 'Shopify authentication failed. Check your tokens.') {
    super(message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Thrown when Shopify returns GraphQL query errors in the response body
 */
export class GraphQLError extends CommerceError {
  constructor(public readonly errors: any[], message: string = 'GraphQL execution returned errors') {
    super(message);
    this.name = 'GraphQLError';
    Object.setPrototypeOf(this, GraphQLError.prototype);
  }
}

/**
 * Domain-specific errors
 */
export class ProductNotFoundError extends CommerceError {
  constructor(handleOrId: string) {
    super(`Product not found: ${handleOrId}`);
    this.name = 'ProductNotFoundError';
    Object.setPrototypeOf(this, ProductNotFoundError.prototype);
  }
}

export class CartError extends CommerceError {
  constructor(message: string, originalError?: unknown) {
    super(message, originalError);
    this.name = 'CartError';
    Object.setPrototypeOf(this, CartError.prototype);
  }
}

export class ValidationError extends CommerceError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
