import { createSlice } from "@reduxjs/toolkit";

const FOODS_URL = "http://localhost:6000/products";

const initalState = {
  foods: [],
  status: "",
};

const fetchFoodsSlice = createSlice({
  name: "fetchFoodsSlice",
  initialState: initalState,
  reducers: {},
});
