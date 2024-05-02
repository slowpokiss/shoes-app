import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  cart: {
    name: string,
    size: number,
    count: number,
    price: string,
  }[];
  cartCount: number;
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
    cartCount: 0,
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    updateCart(state, action) {
      state.cart.push(action.payload)
      state.cartCount++;
    },
    clearCart(state) {
      state.cart = [];
    }
  },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;
