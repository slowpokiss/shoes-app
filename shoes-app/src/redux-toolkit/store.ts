import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    category: categorySlice,
    cartSlice: cartSlice,
  }
})