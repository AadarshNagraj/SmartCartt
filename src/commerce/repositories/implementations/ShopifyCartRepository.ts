import { CartRepository } from '../index';
import { CartModel } from '@/commerce/models';
import { shopifyClient } from '../../client/shopifyClient';
import { mapCart } from '../../mappers/cartMapper';
import { GetCartQuery } from '../../graphql/queries/cart';
import { 
  CartCreateMutation, 
  CartLinesAddMutation, 
  CartLinesUpdateMutation, 
  CartLinesRemoveMutation 
} from '../../graphql/mutations/cart';

export class ShopifyCartRepository implements CartRepository {
  private static instance: ShopifyCartRepository;

  private constructor() {}

  public static getInstance(): ShopifyCartRepository {
    if (!ShopifyCartRepository.instance) {
      ShopifyCartRepository.instance = new ShopifyCartRepository();
    }
    return ShopifyCartRepository.instance;
  }

  private handleUserErrors(userErrors: any[]) {
    if (userErrors && userErrors.length > 0) {
      const messages = userErrors.map(e => e.message).join(', ');
      throw new Error(`Cart operation failed: ${messages}`);
    }
  }

  public async createCart(): Promise<CartModel> {
    const data = await shopifyClient.request('cartCreate', CartCreateMutation, { input: {} });
    this.handleUserErrors(data.cartCreate?.userErrors);
    return mapCart(data.cartCreate.cart);
  }

  public async getCart(cartId: string): Promise<CartModel> {
    // We intentionally bypass Next.js cache for cart operations
    // Cache: 'no-store' ensures we always fetch the live cart state
    const data = await shopifyClient.request('getCart', GetCartQuery, { cartId }, { cache: 'no-store' });
    
    if (!data.cart) {
      throw new Error('Cart not found or expired');
    }

    return mapCart(data.cart);
  }

  public async addLine(cartId: string, variantId: string, quantity: number): Promise<CartModel> {
    const data = await shopifyClient.request(
      'cartLinesAdd', 
      CartLinesAddMutation, 
      {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }]
      },
      { cache: 'no-store' }
    );
    
    this.handleUserErrors(data.cartLinesAdd?.userErrors);
    return mapCart(data.cartLinesAdd.cart);
  }

  public async updateLine(cartId: string, lineId: string, quantity: number): Promise<CartModel> {
    const data = await shopifyClient.request(
      'cartLinesUpdate', 
      CartLinesUpdateMutation, 
      {
        cartId,
        lines: [{ id: lineId, quantity }]
      },
      { cache: 'no-store' }
    );
    
    this.handleUserErrors(data.cartLinesUpdate?.userErrors);
    return mapCart(data.cartLinesUpdate.cart);
  }

  public async removeLine(cartId: string, lineId: string): Promise<CartModel> {
    const data = await shopifyClient.request(
      'cartLinesRemove', 
      CartLinesRemoveMutation, 
      {
        cartId,
        lineIds: [lineId]
      },
      { cache: 'no-store' }
    );
    
    this.handleUserErrors(data.cartLinesRemove?.userErrors);
    return mapCart(data.cartLinesRemove.cart);
  }
}

export const cartRepository = ShopifyCartRepository.getInstance();
