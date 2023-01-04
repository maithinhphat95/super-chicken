import React from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";

function NewsPage(props) {
  return (
    <PageCover className="news-page">
      <Carousel />
      <PageContainer className="news-container container">
        <PageTitle title="Tin tức" />
        <div className="news-page-content">
          <h3>Hiện tại chưa có chương trình tuyển dụng.</h3>
          <h3>Chúng tôi sẽ thông báo sớm nhất khi có vị trí tuyển dụng.</h3>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default NewsPage;
