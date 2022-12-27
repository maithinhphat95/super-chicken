import { createSlice } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState: {
    isOpenSideBar: false,
    isOpenActionList: false,
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
    toggleActionList: (state, action) => {
      state.isOpenActionList = !state.isOpenActionList;
    },
    openActionList: (state, action) => {
      state.isOpenActionList = true;
    },
    closeActionList: (state, action) => {
      state.isOpenActionList = false;
    },
  },
});
const { actions, reducer } = drawerSlice;
export const {
  toggleSideBar,
  openSideBar,
  closeSideBar,
  toggleActionList,
  openActionList,
  closeActionList,
} = actions;
export default reducer;
