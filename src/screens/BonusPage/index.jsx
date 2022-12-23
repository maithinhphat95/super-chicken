import React from "react";
import PropTypes from "prop-types";
import Carousel from "../../components/customer/HomePage/Carousel";
import PageTitle from "../../components/common/PageTitle";
import "./style.scss";
BonusPage.propTypes = {};

function BonusPage(props) {
  return (
    <div className="bonus-page">
      <Carousel />
      <div className="bonus-container container">
        <PageTitle title="Khuyến mãi" />
        <div className="bonus-page-content">
          <h3>Hiện tại chưa có chương trình khuyến mãi.</h3>
          <h3>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</h3>
        </div>
      </div>
    </div>
  );
}

export default BonusPage;
