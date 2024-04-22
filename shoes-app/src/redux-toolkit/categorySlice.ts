import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  currCategory: number;
}


const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    currCategory: 10,
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    setCategory(state, action) {
      state.currCategory = action.payload.settingCategory
    }
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
