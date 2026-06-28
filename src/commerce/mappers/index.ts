import { ProductModel, CollectionModel, CartModel, CustomerModel } from '../models';

/**
 * Core mappers to transform raw Shopify Storefront GraphQL responses
 * into our internal clean domain models.
 */

export function mapProduct(rawNode: any): ProductModel {
  if (!rawNode) {
    throw new Error('Cannot map empty product node');
  }

  // Extract primary image
  const images = rawNode.images?.edges?.map((edge: any) => ({
    id: edge.node.id,
    url: edge.node.url,
    altText: edge.node.altText || rawNode.title,
    width: edge.node.width,
    height: edge.node.height,
  })) || [];

  return {
    id: rawNode.id,
    handle: rawNode.handle,
    title: rawNode.title,
    description: rawNode.description,
    descriptionHtml: rawNode.descriptionHtml,
    vendor: rawNode.vendor,
    availableForSale: rawNode.availableForSale,
    priceRange: {
      minVariantPrice: rawNode.priceRange?.minVariantPrice || { amount: '0', currencyCode: 'USD' },
      maxVariantPrice: rawNode.priceRange?.maxVariantPrice || { amount: '0', currencyCode: 'USD' },
    },
    seo: rawNode.seo,
    tags: rawNode.tags || [],
    options: rawNode.options?.map((opt: any) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values,
    })) || [],
    images,
    variants: rawNode.variants?.edges?.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions || [],
      price: edge.node.price || { amount: '0', currencyCode: 'USD' },
      compareAtPrice: edge.node.compareAtPrice,
      image: edge.node.image ? {
        id: edge.node.image.id,
        url: edge.node.image.url,
        altText: edge.node.image.altText,
        width: edge.node.image.width,
        height: edge.node.image.height,
      } : undefined,
    })) || [],
  };
}

export function mapCollection(rawNode: any): CollectionModel {
  if (!rawNode) {
    throw new Error('Cannot map empty collection node');
  }
  
  return {
    id: rawNode.id,
    handle: rawNode.handle,
    title: rawNode.title,
    description: rawNode.description,
    descriptionHtml: rawNode.descriptionHtml,
    seo: rawNode.seo,
    image: rawNode.image ? {
      id: rawNode.image.id,
      url: rawNode.image.url,
      altText: rawNode.image.altText || rawNode.title,
      width: rawNode.image.width,
      height: rawNode.image.height,
    } : undefined,
  };
}

export function mapCart(rawCart: any): CartModel {
  throw new Error("Not implemented in mock");
}

export function mapCustomer(rawCustomer: any): CustomerModel {
  throw new Error("Not implemented in mock");
}
