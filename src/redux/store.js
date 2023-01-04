import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartSlice/cartSlice.js";
import productReducer from "./features/ProductSlice/productSlice";
import orderReducer from "./features/OrderSlice/orderSlice";
import userReducer from "./features/UserSlice/userSlice.js";
import drawerReducer from "./features/DrawerSlice/drawerSlice.js";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
