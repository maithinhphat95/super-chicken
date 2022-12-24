import { Grid } from "@mui/material";
import React from "react";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";
import "./style.scss";
function AuthorizationPage() {
  return (
    <PageCover className="author-page">
      <Carousel />
      <PageContainer className="container author-container">
        <PageTitle title="Đăng ký / Đăng Nhập" />
        <div className="author-page-content">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              Đăng ký
            </Grid>
            <Grid item xs={12} md={6}>
              Đăng Nhập
            </Grid>
          </Grid>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default AuthorizationPage;
