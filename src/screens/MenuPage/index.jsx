import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuHeader from "../../components/customer/MenuPage/MenuHeader";
import ProductList from "../../components/customer/MenuPage/MenuContainer";
import { fetchProduct } from "../../redux/features/Product/productSlice";

function MenuPage(props) {
  return (
    <div className="menu-page">
      <Carousel />
      <MenuHeader />
      <ProductList />
    </div>
  );
}

export default MenuPage;
