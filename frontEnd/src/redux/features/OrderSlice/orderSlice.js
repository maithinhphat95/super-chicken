import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { child, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { orderApis } from "../../../apis/orderApi";
import { STATUS } from "../../../constant/constant";
import { database } from "../../../firebase/config";

export const fetchOrders = createAsyncThunk("order/fetchOrder", async (uid) => {
  //
});

export const addOrder = createAsyncThunk("order/addOrder", async (data) => {
  const newOrderRef = push(ref(database, "orders"));
  const response = await toast.promise(set(newOrderRef, data), {
    pending: "Đơn hàng đang được xử lý",
    success: "Đơn hàng đã hoàn tất 👌",
    error: "Đơn hàng bị lỗi, vui lòng xác nhận lại 🤯",
  });
  return response;
});

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    status: STATUS.IDLE,
    orderList: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state, action) => {
      state.status = STATUS.LOADING;
      console.log("loading");
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      console.log("success");
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.status = STATUS.FAILED;
      console.log("failed");
    });
  },
});
const { actions, reducer } = orderSlice;
export default reducer;
