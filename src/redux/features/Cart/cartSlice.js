import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "openCartSlice",
  initialState: {
    isOpenCart: false,
    cartList: [],
    totalPrice: 0,
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
      const localCart = JSON.parse(localStorage.getItem("cartState")) || {};
      state.cartList = localCart.cartList;
      state.totalPrice = localCart.totalPrice;
      state.totalQuantity = localCart.totalQuantity;
      state.isOpenCart = false;
    },
    saveLocal: (state, action) => {
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    addToCart: (state, action) => {
      const existItem = state.cartList.find((item) => {
        return item.id === action.payload.id;
      });
      if (!existItem) {
        state.cartList.push(action.payload);
      } else {
        const existIndex = state.cartList.indexOf(existItem);
        state.cartList[existIndex].quantity += 1;
        state.cartList[existIndex].subPrice =
          state.cartList[existIndex].quantity *
          state.cartList[existIndex].price;
      }
      state.totalPrice = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.subPrice));
        }, 0)
      );
      state.totalQuantity = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.quantity));
        }, 0)
      );
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    changeQuantity: (state, action) => {
      const indexExist = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartList[indexExist].quantity = action.payload.quantity;
      state.cartList[indexExist].subPrice =
        action.payload.quantity * state.cartList[indexExist].price;

      state.totalPrice = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.subPrice));
        }, 0)
      );

      state.totalQuantity = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.quantity));
        }, 0)
      );
      localStorage.setItem("cartState", JSON.stringify(state));
    },
    deleteItem: (state, action) => {
      state.cartList.splice(action.payload, 1);
      state.totalPrice = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.subPrice));
        }, 0)
      );

      state.totalQuantity = Number(
        state.cartList.reduce((total, current) => {
          return (total += Number(current.quantity));
        }, 0)
      );
      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});
const { actions, reducer } = cartSlice;
export const {
  toggleCart,
  openCart,
  closeCart,
  initCart,
  addToCart,
  changeQuantity,
  deleteItem,
  saveLocal,
} = actions;
export default reducer;
