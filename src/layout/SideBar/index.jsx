import React from "react";
import PropTypes from "prop-types";
import images from "../../assets/images";
import { IconButton } from "@mui/material";
import { FaTimes } from "react-icons/fa";
import "./style.scss";
import { navList } from "../../constant/constant";
import { Link, useParams } from "react-router-dom";
SideBar.propTypes = {};

function SideBar(props) {
  const params = useParams();
  return (
    <div className="side-bar">
      <IconButton className="close-btn">
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
                className={`art-text  ${params?.page === item.url && "active"}`}
                to={item.url || ""}
              >
                {item.content}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SideBar;
