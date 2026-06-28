import { ProductModel, CollectionModel, CartModel, CustomerModel, SearchResultModel } from '../models';

export interface ProductRepository {
  getFeaturedProducts(limit?: number): Promise<ProductModel[]>;
  getNewArrivals(limit?: number): Promise<ProductModel[]>;
  getBestSellers(limit?: number): Promise<ProductModel[]>;
  getProductByHandle(handle: string): Promise<ProductModel>;
  getRecommendedProducts(productId: string, limit?: number): Promise<ProductModel[]>;
  getProductsByCollection(collectionHandle: string, limit?: number): Promise<ProductModel[]>;
  getProducts(limit?: number): Promise<ProductModel[]>;
}

export interface CollectionRepository {
  getCollection(handle: string): Promise<CollectionModel>;
  getCollections(limit: number): Promise<CollectionModel[]>;
  getCollectionProducts(handle: string, limit: number): Promise<ProductModel[]>;
}

export interface CartRepository {
  createCart(): Promise<CartModel>;
  getCart(cartId: string): Promise<CartModel>;
  addLine(cartId: string, variantId: string, quantity: number): Promise<CartModel>;
  updateLine(cartId: string, lineId: string, quantity: number): Promise<CartModel>;
  removeLine(cartId: string, lineId: string): Promise<CartModel>;
}

export interface CustomerRepository {
  // Methods for authentication and account fetching
  login(email: string, password: string): Promise<string>;
  getCustomer(accessToken: string): Promise<CustomerModel>;
}

export interface SearchRepository {
  search(query: string, limit: number): Promise<SearchResultModel>;
}
