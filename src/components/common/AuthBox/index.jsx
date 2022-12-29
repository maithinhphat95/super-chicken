import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { FaCaretDown, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../../firebase/config";
import { toggleActionList } from "../../../redux/features/DrawerSlice/drawerSlice";
import { login, logout } from "../../../redux/features/UserSlice/userSlice";
import { routesPath } from "../../../routes";
import "./style.scss";

export default function AuthBox() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userState = useSelector((state) => state.user);
  const isOpenActionList = useSelector(
    (state) => state.drawer.isOpenActionList
  );

  const [signOut] = useSignOut(auth);

  const [user, loading, error] = useAuthState(auth);

  const handleToggleActionList = () => {
    dispatch(toggleActionList());
  };

  const handleLogout = async () => {
    dispatch(logout());
    const success = await signOut();
    if (success) {
      toast.info("Đăng xuất thành công");
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        dispatch(logout());
      } else {
        const loginUser = {
          name: user?.displayName,
          email: user?.email,
          accessToken: user?.accessToken,
        };
        dispatch(login(loginUser));
      }
    }
  }, [user]);

  return (
    <Stack className="auth" gap={2} direction={"row"}>
      {!userState?.isLogin ? (
        <div className="auth-box">
          <Link to={routesPath.LOGIN} className="auth-item">
            <FaUserAlt />
            <p className="auth-text">Đăng ký / Đăng nhập</p>
          </Link>
        </div>
      ) : (
        <div className="auth-box art-text">
          <Stack
            flexWrap={"wrap"}
            className="auth-item auth-logined"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleActionList();
            }}
          >
            <p style={{ marginRight: "4px" }}>Xin chào, </p>{" "}
            {userState?.loginUser.name || userState?.loginUser.email}
            <FaCaretDown />
          </Stack>
          {isOpenActionList && (
            <div className="action-list">
              <button
                onClick={() => {
                  navigate(routesPath.PROFILE);
                }}
              >
                Thông tin cá nhân
              </button>
              {userState?.isAdmin && <button>Trang quản lý (Admin)</button>}
              <button onClick={handleLogout}>Đăng xuất</button>
            </div>
          )}
        </div>
      )}
    </Stack>
  );
}
