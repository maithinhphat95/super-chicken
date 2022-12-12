import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosClient, { BASE_URL } from "../../../apis/axiosClient";
import { productApi } from "../../../apis/productApi";
import { STATUS } from "../../../constant/constant";

// const FOODS_URL = `${BASE_URL}/products`;
const FOODS_URL = "http://localhost:8000/products";

export const fetchProduct = createAsyncThunk(
  "food/fetchProduct",
  async ({ id, category, limit, keySearch, rangePrice, sortBy, order }) => {
    try {
      // const response = await productApi.getData({
      //   id,
      //   category,
      //   limit,
      //   keySearch,
      //   rangePrice,
      //   sortBy,
      //   order,
      // });
      const response = await axios.get(FOODS_URL);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initalState = {
  products: [],
  total: 0,
  status: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "fetchProductsSlice",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.products = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});

const { actions, reducer } = productSlice;
export default reducer;
