import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../../redux/features/OpenSideBar/openSideBar";

DefaultLayout.propTypes = {};

function DefaultLayout({ children }) {
  const isOpenSideBar = useSelector((state) => state.openSideBar.isOpenSideBar);
  return (
    <>
      {isOpenSideBar && <SideBar />}
      <div className="container">
        <Header />
        <div className="content">{children}</div>
        <Footer />
      </div>
    </>
  );
}

export default DefaultLayout;
