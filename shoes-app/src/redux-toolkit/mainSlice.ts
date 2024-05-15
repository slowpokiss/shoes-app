import { createSlice } from "@reduxjs/toolkit";
import Popup from "../components/Popup";

interface initialStateInterface {
  currCategory: number | string;
  searchState: boolean;
  popupState: boolean;
}

const mainSlice = createSlice({
  name: "categorySlice",
  initialState: {
    currCategory: 10,
    searchState: false,
    popupState: false,
  } satisfies initialStateInterface as initialStateInterface,
  reducers: {
    setCategory(state, action) {
      state.currCategory = action.payload.settingCategory;
    },
    setSearchState(state) {
      state.searchState = !state.searchState;
    },
    setPopupState(state) {
      state.popupState = !state.popupState;
    },
  },
});

export const { setCategory, setSearchState } = mainSlice.actions;
export default mainSlice.reducer;
