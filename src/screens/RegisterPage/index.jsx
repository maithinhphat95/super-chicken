import React, { useEffect } from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import Register from "../../components/customer/AuthPage/Register";
import Carousel from "../../components/customer/HomePage/Carousel";
import "./style.scss";

function RegisterPage() {
  useEffect(() => {
    document.getElementById("register-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  return (
    <PageCover className="register-page">
      <Carousel />
      <PageContainer
        id="register-container"
        className="container register-container"
      >
        {/* <PageTitle title="Đăng ký" /> */}
        <div className="register-page-content">
          <Register />
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default RegisterPage;
