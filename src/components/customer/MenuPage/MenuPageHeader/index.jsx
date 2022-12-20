import { Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MENU_LIST } from "../../../../constant/constant";
import "./style.scss";
function MenuPageHeader() {
  const [fixHeader, setFixHeader] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 530) {
      setFixHeader(true);
    } else {
      setFixHeader(false);
    }
  };

  const executeScroll = (id) => {
    const element = document.getElementById(id);
    const elementPosition = element.getBoundingClientRect().top;
    // window.pageYOffset : khoảng cách offset từ đầu trang tới vị trí hiện tại
    // element.getBoundingClientRect() : lấy vị trí của element so với view hiện tại.
    // elementPosition + window.pageYOffset : vị trí element so với đầu trang
    window.scrollTo({
      top: elementPosition + window.pageYOffset - 80,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  return (
    <div className={`menu-header art-text ${fixHeader ? "fix-header" : ""} `}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <ul className="menu-header-list">
          {MENU_LIST.map((item, index) => {
            return (
              <li key={index} className="menu-header-list-category ">
                <a
                  // href={`#${item.url}`}
                  onClick={() => {
                    executeScroll(item.url);
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <select
          className="menu-header-select art-text"
          onChange={(e) => {
            executeScroll(e.target.value);
          }}
        >
          {MENU_LIST.map((item, index) => {
            return (
              <option
                key={index}
                className="menu-header-select-option"
                value={item.url}
              >
                {item.title}
              </option>
            );
          })}
        </select>
      </Box>
    </div>
  );
}

export default MenuPageHeader;
