import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../../apis/axiosClient";
import { userApis } from "../../../apis/userApi";
import { STATUS } from "../../../constant/constant";

// Middleware thunk functions
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async ({ id, email, password }) => {
    const response = await userApis.get({
      id,
      email,
      password,
    });

    return response.data;
  }
);

export const updateUser = createAsyncThunk("user/updateUser", async () => {
  //
});

const initalState = {
  isLogin: false,
  loginUser: {
    name: null,
    email: "",
    accessToken: "",
  },
  status: STATUS.IDLE,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initalState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.loginUser.name = action.payload.name;
      state.loginUser.email = action.payload.email;
      state.loginUser.accessToken = action.payload.accessToken;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("accessToken");
      state.loginUser = initalState.loginUser;
    },
  },
  extraReducers: (builder) => {},
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;
