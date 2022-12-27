import React from "react";
import PropTypes from "prop-types";
import ArtBtn from "../../../common/ArtBtn";
import "./style.scss";
SlideBtn.propTypes = {};

function SlideBtn(props) {
  const { img, url } = props;
  return (
    <div className="slide-btn">
      <img src={img} alt="" />
      <ArtBtn url={url} />
    </div>
  );
}

export default SlideBtn;
