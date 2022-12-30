import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { BsCart2, BsPersonCircle, BsPersonXFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PageContainer from "../../components/common/PageContainer/index.jsx";
import PageCover from "../../components/common/PageCover/index.jsx";
import PageTitle from "../../components/common/PageTitle/index.jsx";
import OrderList from "../../components/customer/ProfilePage/OrderList/index.jsx";
import UserInfor from "../../components/customer/ProfilePage/UserInfo/index.jsx";
import { auth } from "../../firebase/config.js";
import { logout } from "../../redux/features/UserSlice/userSlice.js";
import "./style.scss";

function ProfilePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  // Handle Logout
  const handleLogout = async () => {
    dispatch(logout());
    const success = await signOut();
    if (success) {
      toast.info("Đăng xuất thành công");
    }
  };

  // Init page
  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/");
      }
    }
  }, [user, loading]);

  return (
    <PageCover className="profile-page">
      <ToastContainer autoClose="1500" pauseOnHover="false" />
      <PageContainer className="profile-container container">
        <PageTitle title="Thông tin khách hàng" />
        <div className="profile-page-content">
          <Grid container className="profile">
            {/* profile-nav-list */}
            <Grid item xs={12} md={3}>
              <div className="profile-nav nor-text">
                <List
                  sx={{
                    width: "100%",
                    padding: 0,
                  }}
                  component="nav"
                  aria-label=""
                >
                  <Link to={"infor"}>
                    <ListItem button divider className="profile-nav-item">
                      <ListItemAvatar>
                        <Avatar>
                          <BsPersonCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Thông tin tài khoản" />
                    </ListItem>
                  </Link>
                  <Link to={"orders"}>
                    <ListItem button divider className="profile-nav-item">
                      <ListItemAvatar>
                        <Avatar>
                          <BsCart2 />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Lịch sử đơn hàng" />
                    </ListItem>
                  </Link>
                  <ListItem
                    button
                    divider
                    className="profile-nav-item"
                    onClick={handleLogout}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <BsPersonXFill />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Đăng xuất" />
                  </ListItem>
                </List>
              </div>
            </Grid>

            {/* profile-content */}
            <Grid item xs={12} md={9}>
              <div className="profile-content">
                <Routes>
                  <Route path={"*"} element={<UserInfor />} />
                  <Route path={"infor"} element={<UserInfor />} />
                  <Route path={"orders"} element={<OrderList />} />
                </Routes>
              </div>
            </Grid>
          </Grid>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default ProfilePage;
