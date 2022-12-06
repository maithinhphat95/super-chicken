import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";

DefaultLayout.propTypes = {};

function DefaultLayout({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <button
        style={{ marginLeft: "50%" }}
        onClick={() => {
          setShowSideBar(!showSideBar);
        }}
      >
        Show
      </button>
      <Header />
      {showSideBar && <SideBar />}
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
