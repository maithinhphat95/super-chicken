import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  closeActionList,
  closeSideBar,
} from "../../redux/features/DrawerSlice/drawerSlice";
import { BsChevronUp } from "react-icons/bs";
import { Outlet, useLocation } from "react-router";
import { FaAngleDoubleUp, FaHome, FaAngleUp } from "react-icons/fa";
import { Box } from "@mui/material";

function DefaultLayout({ children }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const isOpenSideBar = useSelector((state) => state.drawer.isOpenSideBar);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar());
    dispatch(closeActionList());
  }, [location, children]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showTopBtn && (
        <button
          className="fixed-button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <div>
            <Box
              sx={{
                border: "1px solid white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
              }}
            >
              <FaAngleUp />
            </Box>
            {/* <p>
              <FaHome />
            </p> */}
          </div>
        </button>
      )}
      {isOpenSideBar && <SideBar />}
      <div className="">
        <Header />
        <div className="content">
          {children}
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
