import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import images from "../../assets/images";
import AuthBox from "../../components/common/AuthBox";
import { navList } from "../../constant/constant";
import { closeSideBar } from "../../redux/features/DrawerSlice/drawerSlice";
import "./style.scss";
SideBar.propTypes = {};

function SideBar(props) {
  const dispatch = useDispatch();
  const handleCloseSideBar = () => {
    dispatch(closeSideBar());
  };
  const location = useLocation();

  return (
    <div
      className="side-bar-container"
      onClick={(e) => {
        handleCloseSideBar();
      }}
    >
      <div
        className="side-bar"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <IconButton
          className="close-btn"
          title="Close"
          onClick={(e) => handleCloseSideBar()}
        >
          <FaTimes />
        </IconButton>

        <div className="logo">
          <img src={images.logo} alt="" />
        </div>
        <AuthBox />
        <ul className="side-bar-list">
          {navList &&
            navList.map((item, index) => {
              return (
                <li key={index} className="side-bar-item">
                  <Link
                    className={`art-text  ${
                      location.pathname === item.url && "active"
                    }`}
                    to={item.url || ""}
                  >
                    {item.content}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
