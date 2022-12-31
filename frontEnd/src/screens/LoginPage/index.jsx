import React, { useEffect } from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import Login from "../../components/customer/AuthPage/Login";
import Carousel from "../../components/customer/HomePage/Carousel";
import "./style.scss";

function LoginPage() {
  useEffect(() => {
    document.getElementById("login-container").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, []);

  return (
    <PageCover className="login-page">
      <Carousel />
      <PageContainer id="login-container" className="container login-container">
        {/* <PageTitle title="Đăng ký" /> */}
        <div className="login-page-content">
          <Login />
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default LoginPage;
