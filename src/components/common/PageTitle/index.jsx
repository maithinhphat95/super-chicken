import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
PageTitle.propTypes = {};

function PageTitle(props) {
  return <h1 className="page-title">{props.title}</h1>;
}

export default PageTitle;
