import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { orderApis } from "../../../apis/orderApi";
import { STATUS } from "../../../constant/constant";

export const fetchOrders = createAsyncThunk("order/fetchOrder", async () => {
  //
});

export const addOrder = createAsyncThunk("order/addOrder", async (data) => {
  const response = await toast.promise(orderApis.add(data), {
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
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.status = STATUS.SUCCESS;
      state.orderList.push(action.payload.data);
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.status = STATUS.FAILED;
    });
  },
});
const { actions, reducer } = orderSlice;
export default reducer;
