import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import bdParty from "../../../../assets/images/service-party.jpg";
import kidClub from "../../../../assets/images/kid-club.jpg";
import bigOrder from "../../../../assets/images/big-order.png";
import "./style.scss";
import ServiceListItem from "../ServiceListItem";
ServiceListSection.propTypes = {};

function ServiceListSection(props) {
  return (
    <div className="service-section art-text">
      <h1>Dịch vụ</h1>
      <h3>Tận hưởng những khoảnh khắc trọn vẹn cùng Super Chicken</h3>
      <Grid container spacing={2} className="service-section-list">
        <ServiceListItem title="Đặt tiệt sinh nhật" img={bdParty} url="" />
        <ServiceListItem title="Super Chicken Kid Club" img={kidClub} url="" />
        <ServiceListItem title="Đơn hàng lớn" img={bigOrder} url="" />
      </Grid>
    </div>
  );
}

export default ServiceListSection;
