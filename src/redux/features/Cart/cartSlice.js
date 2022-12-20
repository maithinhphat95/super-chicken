import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "openCartSlice",
  initialState: {
    isOpenCart: false,
    cartList: [],
    totalAmount: 0,
    totalQuantity: 0,
  },
  reducers: {
    toggleCart: (state, action) => {
      state.isOpenCart = !state.isOpenCart;
    },
    openCart: (state, action) => {
      state.isOpenCart = true;
    },
    closeCart: (state, action) => {
      state.isOpenCart = false;
    },
    initCart: (state, action) => {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      console.log(localCart);
    },
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
    },
  },
});
const { actions, reducer } = cartSlice;
export const { toggleCart, openCart, closeCart } = actions;
export default reducer;
