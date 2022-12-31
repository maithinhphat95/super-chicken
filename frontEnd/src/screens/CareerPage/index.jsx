import React from "react";
import PageCover from "../../components/common/PageCover";
import Carousel from "../../components/customer/HomePage/Carousel";
import PageContainer from "../../components/common/PageContainer";
import PageTitle from "../../components/common/PageTitle";

function CareerPage(props) {
  return (
    <PageCover className="career-page">
      <Carousel />
      <PageContainer className="career-container container">
        <PageTitle title="Tuyển dụng" />
        <div className="career-page-content">
          <h3>Hiện tại chưa có chương trình tuyển dụng.</h3>
          <h3>Chúng tôi sẽ thông báo sớm nhất khi có vị trí tuyển dụng.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default CareerPage;
