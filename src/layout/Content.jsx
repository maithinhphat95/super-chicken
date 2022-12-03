import React from "react";
import PropTypes from "prop-types";
import Carousel from "../components/customer/Carousel";
import MenuToday from "../components/customer/MenuToday";

Content.propTypes = {};

function Content(props) {
  return (
    <div className="content">
      <Carousel />
      <MenuToday />
    </div>
  );
}

export default Content;
