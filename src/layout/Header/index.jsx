import { Grid, IconButton, Stack } from "@mui/material";
import "animate.css";
import React, { useEffect } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { FaBars, FaCaretDown, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import images from "../../assets/images";
import AuthBox from "../../components/common/AuthBox";
import NavItem from "../../components/customer/NavItem";
import { navList } from "../../constant/constant";
import { auth } from "../../firebase/config";
import {
  closeActionList,
  openActionList,
  toggleSideBar,
} from "../../redux/features/DrawerSlice/drawerSlice";
import { logout } from "../../redux/features/UserSlice/userSlice";
import { routesPath } from "../../routes";
import "./style.scss";

Header.propTypes = {};
function Header(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const isOpenActionList = useSelector(
    (state) => state.drawer.isOpenActionList
  );
  // Firebase-hook useSignOut
  const [signOut, loading, error] = useSignOut(auth);

  const handleToggleSideBar = () => {
    dispatch(toggleSideBar());
  };

  const toggleActionList = () => {
    dispatch(openActionList());
  };

  const handleLogout = async () => {
    dispatch(logout());
    const success = await signOut();
    if (success) {
      toast.info("Đăng xuất thành công");
    }
  };

  useEffect(() => {
    dispatch(closeActionList());
  }, [navigate]);

  return (
    <div className="header">
      <ToastContainer autoClose="1500" />
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
            <a href="">
              <img className="logo-img" src={images.logo} alt="" />
            </a>
          </div>
        </Grid>

        {/* Nav Bar */}
        <Grid item lg={8} sx={{ display: { xs: "none", lg: "block" } }}>
          <div className="nav-container">
            {/* Auth box */}
            <AuthBox />
            {/* <Stack
              className="auth"
              gap={2}
              direction={"row"}
              justifyContent="flex-end"
              alignItems="center"
            >
              {!userState?.isLogin ? (
                <div className="auth-box">
                  <Link to={routesPath.LOGIN} className="auth-item">
                    <FaUserAlt />
                    <p className="auth-text">Đăng ký / Đăng nhập</p>
                  </Link>
                </div>
              ) : (
                <div className="auth-box art-text">
                  <div
                    className="auth-item auth-logined"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleActionList();
                    }}
                  >
                    <p style={{ marginRight: "4px" }}>Xin chào, </p>{" "}
                    {userState?.loginUser.name || userState?.loginUser.email}
                    <FaCaretDown />
                  </div>
                  {isOpenActionList && (
                    <div className="action-list">
                      <button
                        onClick={() => {
                          navigate("/orders");
                        }}
                      >
                        Đơn hàng
                      </button>
                      {userState?.isAdmin && (
                        <button>Trang quản lý (Admin)</button>
                      )}
                      <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                  )}
                </div>
              )}
            </Stack> */}
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
