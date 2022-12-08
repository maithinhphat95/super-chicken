import React from "react";
import PropTypes from "prop-types";
import images from "../../assets/images";
import { IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import "./style.scss";
import { navList } from "../../constant/constant";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../../redux/features/OpenSideBar/openSideBar";
SideBar.propTypes = {};

function SideBar(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const handleCloseSideBar = () => {
    dispatch(closeSideBar());
  };
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
        <ul className="side-bar-list">
          {navList &&
            navList.map((item, index) => (
              <li key={index} className="side-bar-item">
                <Link
                  className={`art-text  ${
                    params?.page === item.url && "active"
                  }`}
                  to={item.url || ""}
                >
                  {item.content}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
