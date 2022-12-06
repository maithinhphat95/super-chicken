import React from "react";
import { Box, Button, Grid } from "@mui/material";
import MenuTodayItem from "../MenuTodayItem";
import images from "../../../../assets/images";
import "./style.scss";
MenuToday.propTypes = {};

function MenuToday(props) {
  return (
    <div className="menu-today-section">
      <Grid container spacing={2} className="menu-today">
        {/* Title */}
        <Grid item xs={12} md={3} className="menu-today-header">
          <Box
            sx={{
              display: { xs: "block", sm: "flex", md: "block" },
              alignItems: "center",
              "&>*": { flex: 1 },
            }}
            className="menu-today-logo"
          >
            <img src={images.logo} alt="" />
            <h1 className="art-text menu-today-title">
              Ăn gì
              <br />
              hôm nay
            </h1>
          </Box>
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
          <MenuTodayItem
            img={images.gaGion}
            imgText={images.gaGionText}
            url={""}
          />
          <MenuTodayItem
            img={images.gaCay}
            imgText={images.gaCayText}
            url={""}
          />
          <MenuTodayItem img={images.myY} imgText={images.myYText} url={""} />
          <MenuTodayItem img={images.nuoc} imgText={images.nuocText} url={""} />
        </Grid>
      </Grid>
    </div>
  );
}

export default MenuToday;
