import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../../constant/constant";

const initalState = {
  isLogin: false,
  loginUser: {
    name: null,
    email: "",
    accessToken: "",
    uid: "",
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
      state.loginUser.uid = action.payload.uid;
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("accessToken");
      state.loginUser = initalState.loginUser;
    },
  },
});

const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;
