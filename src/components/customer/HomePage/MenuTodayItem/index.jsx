import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import SlideBtn from "../SlideBtn";

MenuTodayItem.propTypes = {};

function MenuTodayItem(props) {
  const { img, imgText, url } = props;
  return (
    <Grid item xs={6} sm={3}>
      <div className="menu-today-item">
        <img src={img && img} alt="" />
        <SlideBtn img={imgText && imgText} url={url} />
      </div>
    </Grid>
  );
}

export default MenuTodayItem;
