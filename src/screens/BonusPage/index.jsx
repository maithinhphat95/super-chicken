import React from "react";
import InitPage from "../../components/common/InitPage";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";
import "./style.scss";

function BonusPage(props) {
  return (
    <PageCover className="bonus-page">
      <Carousel />
      <PageContainer className="bonus-container container">
        <PageTitle title="Khuyến mãi" />
        <div className="bonus-page-content">
          <h3>Hiện tại chưa có chương trình khuyến mãi.</h3>
          <h3>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default BonusPage;
