import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  cart: {
    name: string;
    size: number;
    count: number;
    price: string;
    id: number;
  }[];
  cartCount: number;
  totalPrice: number;
}

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    cartCount: localStorage.getItem("cartCount")
      ? JSON.parse(localStorage.getItem("cartCount"))
      : 0,
    totalPrice: localStorage.getItem("totalPrice")
      ? JSON.parse(localStorage.getItem("totalPrice"))
      : 0,
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    addToCart(state, action) {
      let repeatingCard = state.cart.find(
        (el) => action.payload.id === el.id && action.payload.size === el.size
      );
      if (repeatingCard) {
        repeatingCard.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }

      state.cartCount = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, curr) => sum + Number(curr.count) * Number(curr.price),
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", String(state.cartCount));
      localStorage.setItem("totalPrice", String(state.totalPrice));
    },
    clearCart(state) {
      state.cart = [];
      state.cartCount = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("cartCount");
      localStorage.removeItem("totalPrice");
    },
    updateState(state) {
      const localCart = localStorage.getItem("cart");
      const localCartCount = localStorage.getItem("cartCount");
      const localTotalPrice = localStorage.getItem("totalPrice");
      if (localCart && localCartCount && localTotalPrice) {
        state.cart = JSON.parse(localCart);
        state.cartCount = parseInt(localCartCount);
        state.totalPrice = parseInt(localTotalPrice);
      }
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.id !== action.payload.id);
      state.cartCount = state.cart.length;
      state.totalPrice = state.cart.reduce(
        (sum, curr) => sum + Number(curr.count) * Number(curr.price),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("cartCount", String(state.cartCount));
      localStorage.setItem("totalPrice", String(state.totalPrice));
    },
  },
});

export const { addToCart, deleteItem, clearCart, updateState } =
  cartSlice.actions;
export default cartSlice.reducer;
