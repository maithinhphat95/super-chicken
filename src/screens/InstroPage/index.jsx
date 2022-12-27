import React from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";

function InstroPage(props) {
  return (
    <PageCover className="instro-page">
      <Carousel />
      <PageContainer className="instro-container container">
        <PageTitle title="Giới thiệu" />
        <div className="instro-page-content">
          <h3>Giới thiệu.</h3>
          <h3>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default InstroPage;
