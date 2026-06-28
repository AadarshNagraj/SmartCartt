import { CartFragment } from '../fragments/cart';

export const GetCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CartFragment}
`;
