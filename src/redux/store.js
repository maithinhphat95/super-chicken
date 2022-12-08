import { configureStore } from "@reduxjs/toolkit";
import openSideBarReducer from "./features/OpenSideBar/openSideBar.js";
export const store = configureStore({
  reducer: {
    openSideBar: openSideBarReducer,
  },
});
