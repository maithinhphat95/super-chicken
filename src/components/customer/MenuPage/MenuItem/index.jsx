import React from "react";
import { Grid } from "@mui/material";
import ArtBtn from "../../../common/ArtBtn";

function MenuItem(props) {
  const { product } = props;
  return (
    <Grid item xs={12} sm={6} md={3} className="menu-list-item">
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
        {/* 
        <p className="menu-list-item-card-title">01 miếng gà giòn vui vẻ</p>
        <p className="menu-list-item-card-title">01 mỳ ý sốt bò bằm</p>
        <p className="menu-list-item-card-title">01 nước ngọt (vừa)</p> */}
      </div>
      <div>
        <p className="menu-list-item-price">65.000 đ</p>
        <ArtBtn style="btn2" />
      </div>
    </Grid>
  );
}

export default MenuItem;
