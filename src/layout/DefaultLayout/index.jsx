import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const isOpenSideBar = useSelector((state) => state.openSideBar.isOpenSideBar);
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
