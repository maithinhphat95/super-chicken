import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MENU_LIST } from "../../../../constant/constant";
import "./style.scss";
function MenuHeader() {
  const [fixHeader, setFixHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 530) {
      setFixHeader(true);
    } else {
      setFixHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  useEffect(() => {
    window.scrollTo(0, 520);
  }, []);

  return (
    <div className={`menu-header art-text ${fixHeader ? "fix-header" : ""} `}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ul className="menu-header-list">
          {MENU_LIST.map((item, index) => {
            return (
              <li key={index} className="menu-header-list-category ">
                <a href={item.url}> {item.title}</a>
              </li>
            );
          })}
        </ul>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <select className="menu-header-select art-text">
          {MENU_LIST.map((item, index) => {
            return (
              <option
                key={index}
                className="menu-header-select-option"
                value={item}
              >
                <Link to={item.url}> {item.title}</Link>
              </option>
            );
          })}
        </select>
      </Box>
    </div>
  );
}

export default MenuHeader;
