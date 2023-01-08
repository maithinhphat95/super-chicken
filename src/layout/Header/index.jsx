import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import "animate.css";
import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import images from "../../assets/images";
import AuthBox from "../../components/common/AuthBox";
import NavItem from "../../components/customer/NavItem";
import { navList } from "../../constant/constant";
import {
  closeActionList,
  toggleSideBar,
} from "../../redux/features/DrawerSlice/drawerSlice";
import "./style.scss";

Header.propTypes = {};
function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleSideBar = () => {
    dispatch(toggleSideBar());
  };

  useEffect(() => {
    dispatch(closeActionList());
  }, [navigate]);

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
              onClick={(e) => {
                e.stopPropagation();
                handleToggleSideBar();
              }}
            >
              <FaBars size={"2rem"} />
            </IconButton>
          </div>
        </Grid>

        {/* Logo */}
        <Grid item xs={4} lg={2}>
          <div className="logo">
            <Link to={"/"}>
              <img className="logo-img" src={images.logo} alt="" />
            </Link>
          </div>
        </Grid>

        {/* Nav Bar */}
        <Grid item lg={8} sx={{ display: { xs: "none", lg: "block" } }}>
          <div className="nav-container">
            {/* Auth box */}
            <Box sx={{ alignSelf: "flex-end" }}>
              <AuthBox />
            </Box>

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
