import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  currCategory: number | string;
  searchState: boolean;
}

const mainSlice = createSlice({
  name: "categorySlice",
  initialState: {
    currCategory: 10,
    searchState: false,
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    setCategory(state, action) {
      state.currCategory = action.payload.settingCategory;
    },
    setSearchState(state) {
      state.searchState = !state.searchState;
    },
  },
});

export const { setCategory, setSearchState } = mainSlice.actions;
export default mainSlice.reducer;
