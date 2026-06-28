import { shopifyClient } from '../../client/shopifyClient';
import { CollectionRepository, ProductRepository } from '../index';
import { CollectionModel, ProductModel } from '../../models';
import { mapCollection, mapProduct } from '../../mappers';
import { CommerceError } from '../../errors';
import { extractNodes } from '../../utils/helpers';
import { GetCollectionsQuery, GetCollectionQuery } from '../../graphql/queries/collection';
import { productRepository } from './ShopifyProductRepository';

export class ShopifyCollectionRepository implements CollectionRepository {
  private static instance: ShopifyCollectionRepository;

  private constructor() {}

  public static getInstance(): ShopifyCollectionRepository {
    if (!ShopifyCollectionRepository.instance) {
      ShopifyCollectionRepository.instance = new ShopifyCollectionRepository();
    }
    return ShopifyCollectionRepository.instance;
  }

  public async getCollection(handle: string): Promise<CollectionModel> {
    const data = await shopifyClient.request(
      'getCollection',
      GetCollectionQuery,
      { handle },
      { next: { revalidate: 3600 } }
    );

    if (!data.collection) {
      throw new CommerceError(`Collection with handle ${handle} not found`);
    }

    return mapCollection(data.collection);
  }

  public async getCollections(limit: number = 4): Promise<CollectionModel[]> {
    const data = await shopifyClient.request(
      'getCollections',
      GetCollectionsQuery,
      { first: limit },
      { next: { revalidate: 3600 } } // Cache collections for 1 hour
    );

    const nodes = extractNodes(data.collections);
    return nodes.map(mapCollection);
  }

  public async getCollectionProducts(handle: string, limit: number): Promise<ProductModel[]> {
    return productRepository.getProductsByCollection(handle, limit);
  }
}

export const collectionRepository = ShopifyCollectionRepository.getInstance();
