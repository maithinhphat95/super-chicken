import React, { useState } from "react";
import { Grid } from "@mui/material";
import ArtBtn from "../../../common/ArtBtn";
import {
  addToCart,
  cartSlice,
  initCart,
} from "../../../../redux/features/CartSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function MenuItem(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const handleAddToCart = (item) => {
    const cartItem = { ...item, quantity: 1, subPrice: product.price };
    dispatch(addToCart(cartItem));
  };
  return (
    <Grid item xs={6} sm={6} md={3} className="menu-list-item">
      <div className="menu-list-item-card">
        <div className="menu-list-item-card-img">
          <img src={product.image} alt="" />
        </div>
        <h3 className="menu-list-item-card-name">
          <span>{product.name}</span>
        </h3>
        {product.description.split(" + ").map((item, index) => (
          <p key={index} className="menu-list-item-card-description">
            {item}
          </p>
        ))}
      </div>
      <div>
        <p className="menu-list-item-price">
          <span>{Number(product.price).toLocaleString()}</span> đ
        </p>
        <ArtBtn
          style="btn2"
          handleClick={() => {
            handleAddToCart(product);
          }}
        />
        {/* <div className="menu-list-item-btn"></div> */}
      </div>
    </Grid>
  );
}

export default MenuItem;
