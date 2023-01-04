import React from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";

ContactPage.propTypes = {};

function ContactPage(props) {
  return (
    <PageCover className="contact-page">
      <Carousel />
      <PageContainer className="contact-container container">
        <PageTitle title="Liên hệ" />
        <div className="contact-page-content">
          <h3>Hiện tại chưa có chương trình khuyến mãi.</h3>
          <h3>Xin cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default ContactPage;
