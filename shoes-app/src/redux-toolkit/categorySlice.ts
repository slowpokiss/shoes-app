import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  currCategory: string;
}


const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    currCategory: "Все",
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    setCategory(state, action) {
      state.currCategory = action.payload.settingCategory
    }
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
