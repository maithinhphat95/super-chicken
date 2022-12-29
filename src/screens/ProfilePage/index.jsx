import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { child, get, onValue, ref } from "firebase/database";
import { reload } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { useList } from "react-firebase-hooks/database";
import { BsCart2, BsPersonCircle, BsPersonXFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import PageContainer from "../../components/common/PageContainer/index.jsx";
import PageCover from "../../components/common/PageCover/index.jsx";
import PageTitle from "../../components/common/PageTitle/index.jsx";
import OrderList from "../../components/customer/ProfilePage/OrderList/index.jsx";
import UserInfor from "../../components/customer/ProfilePage/UserInfo/index.jsx";
import { auth, database } from "../../firebase/config.js";
import { login, logout } from "../../redux/features/UserSlice/userSlice.js";
import "./style.scss";
import { Link } from "react-router-dom";

function ProfilePage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const dbRef = ref(database);
  const productRef = ref(database, "products");
  const [orderSnapshots, snLoading, snError] = useList(ref(database, "orders"));
  // console.log(orderSnapshots);

  // Handle Logout
  const handleLogout = async () => {
    dispatch(logout());
    const success = await signOut();
    if (success) {
      toast.info("Đăng xuất thành công");
    }
  };

  // Handle with firebase Realtime DB

  // get(child(dbRef, `products/0`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // onValue(productRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log(data);
  // });

  // get(child(productRef, "1"))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  console.log(loading);

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
                    <ListItem button divider className="nav-item">
                      <ListItemAvatar>
                        <Avatar>
                          <BsPersonCircle />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Thông tin tài khoản" />
                    </ListItem>
                  </Link>
                  <Link to={"orders"}>
                    <ListItem button divider className="nav-item">
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
                    className="nav-item"
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
