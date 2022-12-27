import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  closeActionList,
  closeSideBar,
} from "../../redux/features/DrawerSlice/drawerSlice";

function DefaultLayout({ children }) {
  const isOpenSideBar = useSelector((state) => state.drawer.isOpenSideBar);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar());
    dispatch(closeActionList());
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  }, [children]);
  return (
    <>
      {isOpenSideBar && <SideBar />}
      <div className="page-container">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
