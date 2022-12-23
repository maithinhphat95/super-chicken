import { createSlice } from "@reduxjs/toolkit";

export const openSideBarSlice = createSlice({
  name: "openSideBarSlice",
  initialState: {
    isOpenSideBar: false,
  },
  reducers: {
    toggleSideBar: (state, action) => {
      state.isOpenSideBar = !state.isOpenSideBar;
    },
    openSideBar: (state, action) => {
      state.isOpenSideBar = true;
    },
    closeSideBar: (state, action) => {
      state.isOpenSideBar = false;
    },
  },
});
const { actions, reducer } = openSideBarSlice;
export const { toggleSideBar, openSideBar, closeSideBar } = actions;
export default reducer;
