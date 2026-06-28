import { ProductModel, ProductImage, ProductOption, ProductVariant } from '../types/product';

// ---------------------------------------------------------
// THE MAPPER
// Converts raw Shopify GraphQL responses into our clean ProductModel
// ---------------------------------------------------------

export function mapShopifyProduct(rawProduct: any): ProductModel {
  return {
    id: rawProduct.id,
    handle: rawProduct.handle,
    title: rawProduct.title,
    description: rawProduct.description,
    descriptionHtml: rawProduct.descriptionHtml,
    vendor: rawProduct.vendor,
    availableForSale: rawProduct.availableForSale,
    priceRange: rawProduct.priceRange,
    seo: rawProduct.seo,
    tags: rawProduct.tags,
    options: rawProduct.options.map((opt: any) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values
    })),
    images: rawProduct.images.edges.map(({ node }: any) => ({
      id: node.id,
      url: node.url,
      altText: node.altText || rawProduct.title,
      width: node.width,
      height: node.height
    })),
    variants: rawProduct.variants.edges.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions,
      price: node.price,
      compareAtPrice: node.compareAtPrice,
      image: node.image ? {
        id: node.image.id,
        url: node.image.url,
        altText: node.image.altText,
        width: node.image.width,
        height: node.image.height
      } : undefined
    }))
  };
}
