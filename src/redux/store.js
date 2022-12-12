import { configureStore } from "@reduxjs/toolkit";
import openSideBarReducer from "./features/OpenSideBar/openSideBar.js";
import productReducer from "./features/Product/productSlice";
export const store = configureStore({
  reducer: {
    openSideBar: openSideBarReducer,
    product: productReducer,
  },
});
