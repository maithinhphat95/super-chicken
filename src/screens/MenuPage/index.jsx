import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../redux/features/Product/productSlice";
import axios from "axios";
import { BASE_URL } from "../../apis/axiosClient";
import { productApi } from "../../apis/productApi";

MenuPage.propTypes = {};

function MenuPage(props) {
  const productDatas = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Show state from redux
  console.log(productDatas);

  const handleClick = async () => {
    try {
      const res = await productApi.getData({ category: "combo" });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // dispatch Redux AsynThunk Action
    dispatch(fetchProduct());

    // Fetch data
    const fetchData = async ({ category }) => {
      try {
        const res = await productApi.getData({ category: category });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData({ category: "combo" });
  }, []);

  return (
    <div>
      <p>Menu Page</p>
      <button onClick={handleClick}>Fetch Data</button>
    </div>
  );
}

export default MenuPage;
