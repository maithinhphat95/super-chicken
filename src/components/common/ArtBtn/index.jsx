import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
ArtBtn.propTypes = {};

function ArtBtn(props) {
  const { content, style } = props;
  return (
    <button
      className={`art-btn art-text ${style == "btn2" && "art-btn-style-2"}`}
    >
      {content || "Đặt hàng"}
    </button>
  );
}

export default ArtBtn;
