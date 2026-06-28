// Cart mutations are now co-located in queries.ts to avoid fragment duplication.
// This file re-exports them for backwards compatibility.
export {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_MUTATION,
  REMOVE_FROM_CART_MUTATION,
} from "./queries";
