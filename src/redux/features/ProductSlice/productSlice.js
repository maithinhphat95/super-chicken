import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient, { BASE_URL } from "../../../apis/axiosClient";
import { productApi } from "../../../apis/productApi";
import { STATUS } from "../../../constant/constant";

const PRODUCT_URL = `${BASE_URL}/products`;

// Middleware thunk functions
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({ id, category, limit, keySearch, searchPrice, sortBy, order }) => {
    const response = await productApi.getData({
      id,
      category,
      limit,
      keySearch,
      searchPrice,
      sortBy,
      order,
    });
    return response;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async () => {
    //
  }
);

const initalState = {
  products: [],
  total: 0,
  status: STATUS.IDLE,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch option
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.products = action.payload.data;
      state.total = action.payload.headers["X-Total-Count"];
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});

const { actions, reducer } = productSlice;
export default reducer;
