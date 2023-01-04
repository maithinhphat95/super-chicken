import { Grid } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/features/CartSlice/cartSlice";
import ArtBtn from "../ArtBtn";
import "./style.scss";
export default function ProductItem(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    const cartItem = { ...item, quantity: 1, subPrice: product.price };
    dispatch(addToCart(cartItem));
  };
  return (
    <Grid item xs={6} sm={6} md={3} className="product-item">
      <div className="product-item-card">
        <div className="product-item-card-img">
          <img src={product.image} alt="" />
        </div>
        <h3 className="product-item-card-name art-text">
          <span>{product.name}</span>
        </h3>
        {product.description.split(" + ").map((item, index) => (
          <p key={index} className="product-item-card-description">
            {item}
          </p>
        ))}
      </div>
      <div>
        <p className="product-item-price art-text">
          <span>{Number(product.price)?.toLocaleString()}</span> đ
        </p>
        <ArtBtn
          style="btn2"
          handleClick={() => {
            handleAddToCart(product);
          }}
        />
      </div>
    </Grid>
  );
}
