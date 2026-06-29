import { ProductModel } from '../types/product';

// ---------------------------------------------------------
// THE MAPPER
// Converts raw Shopify GraphQL responses into our clean ProductModel
// ---------------------------------------------------------

interface ShopifyRawImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

interface ShopifyRawVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
  compareAtPrice: { amount: string; currencyCode: string } | null;
  image: ShopifyRawImage | null;
}

interface ShopifyRawOption {
  id: string;
  name: string;
  values: string[];
}

interface ShopifyRawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  availableForSale: boolean;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  seo: { title: string; description: string };
  tags: string[];
  options: ShopifyRawOption[];
  images: { edges: { node: ShopifyRawImage }[] };
  variants: { edges: { node: ShopifyRawVariant }[] };
}

export function mapShopifyProduct(rawProduct: ShopifyRawProduct): ProductModel {
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
    options: rawProduct.options.map((opt) => ({
      id: opt.id,
      name: opt.name,
      values: opt.values
    })),
    images: rawProduct.images.edges.map(({ node }) => ({
      id: node.id,
      url: node.url,
      altText: node.altText ?? rawProduct.title,
      width: node.width,
      height: node.height
    })),
    variants: rawProduct.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions,
      price: node.price,
      compareAtPrice: node.compareAtPrice,
      image: node.image ? {
        id: node.image.id,
        url: node.image.url,
        altText: node.image.altText ?? '',
        width: node.image.width,
        height: node.image.height
      } : undefined
    }))
  };
}
