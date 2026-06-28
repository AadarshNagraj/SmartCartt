// ─────────────────────────────────────────────────────────────────────────────
// Shopify Storefront GraphQL Queries
// Fragments are inlined per query to avoid duplicate fragment name errors.
// ─────────────────────────────────────────────────────────────────────────────

// Shared fragment strings (not interpolated multiple times — included once per query file)
const IMAGE_FIELDS = `
  url
  altText
  width
  height
`;

const MONEY_FIELDS = `
  amount
  currencyCode
`;

const PRODUCT_VARIANT_FIELDS = `
  id
  title
  availableForSale
  sku
  quantityAvailable
  price { ${MONEY_FIELDS} }
  compareAtPrice { ${MONEY_FIELDS} }
  selectedOptions { name value }
  image { ${IMAGE_FIELDS} }
`;

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  descriptionHtml
  vendor
  productType
  tags
  availableForSale
  featuredImage { ${IMAGE_FIELDS} }
  priceRange {
    minVariantPrice { ${MONEY_FIELDS} }
    maxVariantPrice { ${MONEY_FIELDS} }
  }
  images(first: 10) {
    edges { node { ${IMAGE_FIELDS} } }
  }
  variants(first: 20) {
    edges { node { ${PRODUCT_VARIANT_FIELDS} } }
  }
`;

const COLLECTION_FIELDS = `
  id
  handle
  title
  description
  image { ${IMAGE_FIELDS} }
`;

const CART_COST_FIELDS = `
  subtotalAmount { ${MONEY_FIELDS} }
  totalAmount { ${MONEY_FIELDS} }
  totalTaxAmount { ${MONEY_FIELDS} }
`;

const CART_LINE_FIELDS = `
  id
  quantity
  cost {
    totalAmount { ${MONEY_FIELDS} }
  }
  merchandise {
    ... on ProductVariant {
      id
      title
      availableForSale
      sku
      price { ${MONEY_FIELDS} }
      compareAtPrice { ${MONEY_FIELDS} }
      selectedOptions { name value }
      image { ${IMAGE_FIELDS} }
      product {
        id
        handle
        title
        vendor
        featuredImage { ${IMAGE_FIELDS} }
      }
    }
  }
`;

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  lines(first: 50) {
    edges {
      node {
        ${CART_LINE_FIELDS}
      }
    }
  }
  cost {
    ${CART_COST_FIELDS}
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Product Queries
// ─────────────────────────────────────────────────────────────────────────────

export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

export const GET_PRODUCT_RECOMMENDATIONS_QUERY = `
  query GetProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ${PRODUCT_FIELDS}
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Collection Queries
// ─────────────────────────────────────────────────────────────────────────────

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ${COLLECTION_FIELDS}
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE_QUERY = `
  query GetCollectionByHandle($handle: String!, $productsFirst: Int!) {
    collection(handle: $handle) {
      ${COLLECTION_FIELDS}
      products(first: $productsFirst) {
        edges {
          node {
            ${PRODUCT_FIELDS}
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Cart Queries
// ─────────────────────────────────────────────────────────────────────────────

export const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ${CART_FIELDS}
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Cart Mutations
// ─────────────────────────────────────────────────────────────────────────────

export const CREATE_CART_MUTATION = `
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_MUTATION = `
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = `
  mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;
