import React from "react";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

function ArtBtn(props) {
  const { content, style, type, url, handleClick } = props;
  const navigate = useNavigate();

  return (
    <button
      type={type || "button"}
      className={`art-btn art-text ${style == "btn2" && "art-btn-style-2"}`}
      onClick={(e) => {
        e.stopPropagation();
        handleClick && handleClick();
        url && navigate(url);
      }}
    >
      {content || "Đặt hàng"}
    </button>
  );
}

export default ArtBtn;
