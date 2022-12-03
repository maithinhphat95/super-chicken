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
      <Link className="menu-today-item" to={url || ""}>
        <img src={img && img} alt="" />
        <SlideBtn img={imgText && imgText} />
      </Link>
    </Grid>
  );
}

export default MenuTodayItem;
