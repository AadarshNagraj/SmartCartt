import { CartModel, CartLineModel as CartLine } from '@/commerce/models';

export function mapCart(rawCart: any): CartModel {
  if (!rawCart) {
    throw new Error('Cart data is null or undefined');
  }

  const lines = rawCart.lines?.edges?.map(({ node }: any): CartLine => {
    // If merchandise is missing, it might be a deleted product. We handle it safely.
    const merchandise = node.merchandise || {};
    
    return {
      id: node.id,
      quantity: node.quantity,
      cost: {
        totalAmount: {
          amount: node.cost?.totalAmount?.amount || '0',
          currencyCode: node.cost?.totalAmount?.currencyCode || 'USD',
        }
      },
      merchandise: {
        id: merchandise.id,
        title: merchandise.title || 'Unknown Item',
        availableForSale: merchandise.availableForSale ?? true,
        selectedOptions: merchandise.selectedOptions || [],
        price: merchandise.price || { amount: '0', currencyCode: 'USD' },
        image: merchandise.image ? {
          id: merchandise.image.id,
          url: merchandise.image.url,
          altText: merchandise.image.altText || merchandise.title || '',
          width: merchandise.image.width || 500,
          height: merchandise.image.height || 500
        } : undefined,
        product: merchandise.product ? {
          handle: merchandise.product.handle,
          title: merchandise.product.title
        } : { handle: '', title: '' }
      }
    };
  }) || [];

  return {
    id: rawCart.id,
    checkoutUrl: rawCart.checkoutUrl,
    totalQuantity: rawCart.totalQuantity || 0,
    lines,
    cost: {
      subtotalAmount: {
        amount: rawCart.cost?.subtotalAmount?.amount || '0',
        currencyCode: rawCart.cost?.subtotalAmount?.currencyCode || 'USD'
      },
      totalAmount: {
        amount: rawCart.cost?.totalAmount?.amount || '0',
        currencyCode: rawCart.cost?.totalAmount?.currencyCode || 'USD'
      },
      totalTaxAmount: rawCart.cost?.totalTaxAmount ? {
        amount: rawCart.cost.totalTaxAmount.amount,
        currencyCode: rawCart.cost.totalTaxAmount.currencyCode
      } : undefined
    }
  };
}
