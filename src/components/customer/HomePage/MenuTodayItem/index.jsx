import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import SlideBtn from "../SlideBtn";
import { Stack } from "@mui/system";

MenuTodayItem.propTypes = {};

function MenuTodayItem(props) {
  const { img, imgText, url } = props;
  return (
    <Grid item xs={6} sm={3}>
      <Box
        className="menu-today-item"
        sx={{ height: { xs: "300px", sm: "590px" } }}
      >
        <img src={img && img} alt="" />
        <SlideBtn img={imgText && imgText} url={url} />
      </Box>
    </Grid>
  );
}

export default MenuTodayItem;
