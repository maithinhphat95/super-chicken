import "./style.scss";
import "animate.css";
import React from "react";
import { Grid, IconButton, Stack } from "@mui/material";
import { FaBars, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import NavItem from "../../components/customer/NavItem";
import { navList } from "../../constant/constant";
import images from "../../assets/images";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <Grid container spacing={0}>
        {/* Menu button */}
        <Grid item xs={4} sx={{ display: { lg: "none" } }}>
          <div className="menu-btn">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 1, color: "white" }}
            >
              <FaBars size={"2rem"} />
            </IconButton>
          </div>
        </Grid>

        {/* Logo */}
        <Grid item xs={4} lg={2}>
          <div className="logo">
            <a href="">
              <img className="logo-img" src={images.logo} alt="" />
            </a>
          </div>
        </Grid>

        {/* Nav Bar */}
        <Grid item lg={8} sx={{ display: { xs: "none", lg: "block" } }}>
          <div className="nav-container">
            {/* Assist box */}
            <Stack
              className="assist"
              gap={2}
              direction={"row"}
              justifyContent="flex-end"
              alignItems="center"
            >
              <a href="" className="assist-item">
                <FaMapMarkerAlt />
                <span className="assist-text assist-location">
                  Chọn khu vực
                </span>
              </a>

              <a href="" className="assist-item">
                <FaUserAlt />
                <span className="assist-text">Đăng ký / Đăng nhập</span>
              </a>
            </Stack>
            {/* Nav list */}
            <div className="nav d-flex">
              <ul className="nav-list">
                {navList &&
                  navList.map((item, index) => (
                    <NavItem
                      key={index}
                      content={item.content}
                      url={item.url}
                    />
                  ))}
              </ul>
            </div>
          </div>
        </Grid>

        {/* Logo-phone */}
        <Grid item xs={4} lg={2}>
          <div className="logo-phone animate__animated animate__custom animate__fast">
            <a href="tel:0964084330">
              <img
                title="Đặt Hàng Ngay"
                className="logo-phone-img"
                src="https://jollibee.com.vn/images/home/delivery.png"
                alt="Đặt Hàng Ngay"
              />
            </a>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
