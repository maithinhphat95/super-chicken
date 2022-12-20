import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import { Link } from "react-router-dom";
ArtBtn.propTypes = {};

function ArtBtn(props) {
  const { content, style, url, handleClick } = props;
  return (
    <button
      className={`art-btn art-text ${style == "btn2" && "art-btn-style-2"}`}
      onClick={handleClick}
    >
      {url ? (
        <Link to={url}>{content || "Đặt hàng"}</Link>
      ) : (
        content || "Đặt hàng"
      )}
    </button>
  );
}

export default ArtBtn;
