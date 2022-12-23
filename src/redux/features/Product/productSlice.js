import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient, { BASE_URL } from "../../../apis/axiosClient";
import { productApi } from "../../../apis/productApi";
import { STATUS } from "../../../constant/constant";

const PRODUCT_URL = `${BASE_URL}/products`;

// Middleware thunk functions
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async ({
    id,
    category,
    limit,
    keySearch,
    rangePrice,
    sortBy,
    order,
    field,
  }) => {
    const response = await productApi.getData({
      id,
      category,
      limit,
      keySearch,
      rangePrice,
      sortBy,
      order,
    });
    const payload = {
      field: field,
      data: response.data,
      xTotalCount: Number(response.headers["x-total-count"]),
    };
    return payload;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async () => {
    //
  }
);
const initData = { xTotalCount: 0, data: [] };

const initalState = {
  products: initData,
  combos: initData,
  friedChickens: initData,
  spicyChickens: initData,
  spaghetties: initData,
  burgers: initData,
  sideDishes: initData,
  desserts: initData,
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
      state[action.payload.field] = {
        ...{
          data: action.payload.data,
          xTotalCount: action.payload.xTotalCount,
        },
      };
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});

const { actions, reducer } = productSlice;
export default reducer;
