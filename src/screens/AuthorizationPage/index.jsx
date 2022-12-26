import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Login from "../../components/customer/AuthPage/Login";
import Register from "../../components/customer/AuthPage/Register";
import Carousel from "../../components/customer/HomePage/Carousel";
import { userSchema } from "../../constant/schema";
import "./style.scss";

function AuthorizationPage() {
  useEffect(() => {
    document.getElementById("author-container").scrollIntoView(
      { behavior: "smooth", block: "start", inline: "nearest" }
      // true
    );
  }, []);

  return (
    <PageCover className="author-page">
      <Carousel />
      <PageContainer
        id="author-container"
        className="container author-container"
      >
        <PageTitle title="Đăng ký / Đăng Nhập" />
        <div className="author-page-content">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Register />
            </Grid>
            <Grid item xs={12} md={6}>
              <Login />
            </Grid>
          </Grid>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default AuthorizationPage;
