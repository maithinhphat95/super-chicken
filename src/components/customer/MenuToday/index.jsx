import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ArtBtn from "../../common/ArtBtn";
import SlideBtn from "../SlideBtn";
import MenuTodayItem from "../MenuTodayItem";
import logo from "../../../assets/images/logo1.png";
import gaGion from "../../../assets/images/ga-gion.png";
import gaCay from "../../../assets/images/ga-cay.png";
import myY from "../../../assets/images/my-y.png";
import nuoc from "../../../assets/images/nuoc.png";
import gaGionText from "../../../assets/images/ga-gion-text.png";
import gaCayText from "../../../assets/images/ga-cay-text.png";
import myYText from "../../../assets/images/my-y-text.png";
import nuocText from "../../../assets/images/nuoc-text.png";
import "./style.scss";
MenuToday.propTypes = {};

function MenuToday(props) {
  return (
    <div className="menu-today-container">
      <Grid container spacing={2} className="menu-today">
        {/* Title */}
        <Grid item xs={12} md={3} className="menu-today-title">
          <div className="menu-today-logo">
            <img src={logo} alt="" />
          </div>
        </Grid>
        {/* Menu Today list */}
        <Grid
          item
          container
          xs={12}
          md={9}
          spacing={1}
          className="menu-today-list"
        >
          <MenuTodayItem img={gaGion} imgText={gaGionText} url={""} />
          <MenuTodayItem img={gaCay} imgText={gaCayText} url={""} />
          <MenuTodayItem img={myY} imgText={myYText} url={""} />
          <MenuTodayItem img={nuoc} imgText={nuocText} url={""} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuToday;
