import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { MENU_LIST } from "../../../../constant/constant";
import "./style.scss";
function MenuPageHeader() {
  const [fixHeader, setFixHeader] = useState(false);
  const selectCategory = useRef();
  const [initOffset, setInitOffset] = useState(140);

  const handleScroll = () => {
    if (window.scrollY >= 400) {
      setInitOffset(80);
      setFixHeader(true);
    } else {
      setInitOffset(140);
      setFixHeader(false);
    }
  };

  const executeScroll = (id) => {
    const element = document.getElementById(id);
    const elementPosition = element.getBoundingClientRect().top;
    const offset = elementPosition + window.pageYOffset - initOffset;
    // (selectCategory.current === "menu" ? 140 : 80);
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
    selectCategory.current = id;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.scrollY]);

  return (
    <div className={`menu-header art-text ${fixHeader && "fix-header"} `}>
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
