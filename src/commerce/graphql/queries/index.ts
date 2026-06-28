import { ProductFragment } from '../fragments';

export const GetProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;

export const GetProductsQuery = /* GraphQL */ `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;

export * from './collection';
