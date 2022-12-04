import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ArtBtn from "../../../common/ArtBtn";

ServiceListItem.propTypes = {};

function ServiceListItem(props) {
  const { img, title, url } = props;
  return (
    <Grid item xs={12} sm={6} md={4} className="service-section-item">
      <div className="service-section-img">
        <img src={img} alt="" />
      </div>
      <h3>{title}</h3>
      <Link to={url || ""}>
        <ArtBtn content={"Xem thêm"} style={"btn2"} />
      </Link>
    </Grid>
  );
}

export default ServiceListItem;
