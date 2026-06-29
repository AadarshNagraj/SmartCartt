// Centralized Analytics utility to map our domain models to GA4/GTM standard e-commerce schemas
import { ProductModel, CartModel, CartLineModel } from '@/commerce/models';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export const initAnalytics = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
};

const pushToDataLayer = (event: string, payload: unknown = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ecommerce: null }); // Clear previous
    window.dataLayer.push({ event, ecommerce: payload });
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: url,
    });
  }
};

export const trackViewItem = (product: ProductModel) => {
  pushToDataLayer("view_item", {
    currency: product.priceRange?.minVariantPrice?.currencyCode || "USD",
    value: parseFloat(product.priceRange?.minVariantPrice?.amount || "0"),
    items: [
      {
        item_id: product.id,
        item_name: product.title,
      },
    ],
  });
};

export const trackViewItemList = (collectionTitle: string, products: ProductModel[]) => {
  pushToDataLayer("view_item_list", {
    item_list_name: collectionTitle,
    items: products.slice(0, 10).map((p, index) => ({
      item_id: p.id,
      item_name: p.title,
      index,
    })),
  });
};

export const trackAddToCart = (variant: unknown, quantity: number) => {
  const v = variant as { id?: string; title?: string; price?: { amount?: string; currencyCode?: string }; product?: { title?: string; priceRange?: { minVariantPrice?: { amount?: string } } } };
  const price = v.price?.amount || v.product?.priceRange?.minVariantPrice?.amount || "0";
  const currency = v.price?.currencyCode || "USD";
  
  pushToDataLayer("add_to_cart", {
    currency,
    value: parseFloat(price) * quantity,
    items: [
      {
        item_id: v.id,
        item_name: v.product?.title || v.title,
        item_variant: v.title,
        price: parseFloat(price),
        quantity,
      },
    ],
  });
};

export const trackRemoveFromCart = (lineItem: CartLineModel) => {
  pushToDataLayer("remove_from_cart", {
    currency: lineItem.cost?.totalAmount?.currencyCode || "USD",
    value: parseFloat(lineItem.cost?.totalAmount?.amount || "0"),
    items: [
      {
        item_id: lineItem.merchandise?.id,
        item_name: lineItem.merchandise?.product?.title,
        quantity: lineItem.quantity,
      },
    ],
  });
};

export const trackBeginCheckout = (cart: CartModel) => {
  pushToDataLayer("begin_checkout", {
    currency: cart.cost?.totalAmount?.currencyCode || "USD",
    value: parseFloat(cart.cost?.totalAmount?.amount || "0"),
    items: cart.lines.map((line) => ({
      item_id: line.merchandise?.id,
      item_name: line.merchandise?.product?.title,
      quantity: line.quantity,
    })),
  });
};

export const trackSearch = (searchTerm: string) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: "search", search_term: searchTerm });
  }
};
