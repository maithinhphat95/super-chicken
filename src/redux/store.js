import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/Cart/cartSlice.js";
import openSideBarReducer from "./features/OpenSideBar/openSideBar.js";
import productReducer from "./features/Product/productSlice";
import orderReducer from "./features/Order/orderSlice";

export const store = configureStore({
  reducer: {
    openSideBar: openSideBarReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
