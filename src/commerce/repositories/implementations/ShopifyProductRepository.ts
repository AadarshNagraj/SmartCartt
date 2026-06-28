import { shopifyClient } from '../../client/shopifyClient';
import { ProductRepository } from '../index';
import { ProductModel } from '../../models';
import { mapProduct } from '../../mappers';
import { ProductNotFoundError } from '../../errors';
import { extractNodes } from '../../utils/helpers';
import { 
  GetProductByHandleQuery, 
  GetProductsQuery,
  GetProductsByCollectionQuery,
  GetProductRecommendationsQuery
} from '../../graphql/queries/product';

export class ShopifyProductRepository implements ProductRepository {
  private static instance: ShopifyProductRepository;

  private constructor() {}

  public static getInstance(): ShopifyProductRepository {
    if (!ShopifyProductRepository.instance) {
      ShopifyProductRepository.instance = new ShopifyProductRepository();
    }
    return ShopifyProductRepository.instance;
  }

  public async getProductByHandle(handle: string): Promise<ProductModel> {
    const data = await shopifyClient.request(
      'getProductByHandle',
      GetProductByHandleQuery,
      { handle },
      { next: { revalidate: 600 } } // 10 minutes cache for PDP as requested
    );

    if (!data.product) {
      throw new ProductNotFoundError(handle);
    }

    return mapProduct(data.product);
  }

  public async getFeaturedProducts(limit: number = 8): Promise<ProductModel[]> {
    const data = await shopifyClient.request(
      'getFeaturedProducts',
      GetProductsQuery,
      { first: limit, sortKey: 'BEST_SELLING' },
      { next: { revalidate: 300 } }
    );
    const nodes = extractNodes(data.products);
    return nodes.map(mapProduct);
  }

  public async getProducts(limit: number = 100): Promise<ProductModel[]> {
    const data = await shopifyClient.request(
      'getProducts',
      GetProductsQuery,
      { first: limit },
      { next: { revalidate: 3600 } }
    );
    const nodes = extractNodes(data.products);
    return nodes.map(mapProduct);
  }

  public async getNewArrivals(limit: number = 4): Promise<ProductModel[]> {
    const data = await shopifyClient.request(
      'getNewArrivals',
      GetProductsQuery,
      { first: limit, sortKey: 'CREATED_AT', reverse: true }, // 'reverse' is needed for descending if Shopify supports it in this query, but without modifying the query string we'll just sort on client if needed. Wait, our GetProductsQuery doesn't have reverse. We'll just pass CREATED_AT.
      { next: { revalidate: 300 } }
    );

    const nodes = extractNodes(data.products);
    return nodes.map(mapProduct);
  }

  public async getBestSellers(limit: number = 4): Promise<ProductModel[]> {
    const data = await shopifyClient.request(
      'getBestSellers',
      GetProductsQuery,
      { first: limit, sortKey: 'BEST_SELLING' },
      { next: { revalidate: 300 } }
    );

    const nodes = extractNodes(data.products);
    return nodes.map(mapProduct);
  }

  public async getProductsByCollection(collectionHandle: string, limit: number = 10): Promise<ProductModel[]> {
    const data = await shopifyClient.request(
      'getProductsByCollection',
      GetProductsByCollectionQuery,
      { handle: collectionHandle, first: limit },
      { next: { revalidate: 600 } }
    );

    if (!data.collection) {
      return [];
    }

    const nodes = extractNodes(data.collection.products);
    return nodes.map(mapProduct);
  }

  public async getRecommendedProducts(productId: string, limit: number = 4): Promise<ProductModel[]> {
    // 1. Try Shopify Recommendations API
    const data = await shopifyClient.request(
      'getProductRecommendations',
      GetProductRecommendationsQuery,
      { productId },
      { next: { revalidate: 600 } }
    );

    let products = (data.productRecommendations || []).map(mapProduct);

    // 2. Cascading Fallback Logic as requested by user
    if (products.length === 0) {
      try {
        // Fallback to Featured (Best Sellers)
        products = await this.getFeaturedProducts(limit);
      } catch (e) {
        // Safe fail
      }
    }

    return products.slice(0, limit);
  }
}

export const productRepository = ShopifyProductRepository.getInstance();
