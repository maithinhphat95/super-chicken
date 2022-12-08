import { createSlice } from "@reduxjs/toolkit";

const openSideBarSlice = createSlice({
  name: "openSideBarSlice",
  initialState: {
    isOpenSideBar: false,
  },
  reducers: {
    toggleSideBar: (state, action) => {
      console.log("toggle");
      state.isOpenSideBar = !state.isOpenSideBar;
    },
    openSideBar: (state, action) => {
      console.log("open");
      state.isOpenSideBar = true;
    },
    closeSideBar: (state, action) => {
      console.log("close");
      state.isOpenSideBar = false;
    },
  },
});
const { actions, reducer } = openSideBarSlice;
export const { toggleSideBar, openSideBar, closeSideBar } = actions;
export default reducer;
