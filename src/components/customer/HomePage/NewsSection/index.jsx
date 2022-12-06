import "./style.scss";
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import ArtBtn from "../../../common/ArtBtn";

NewsSection.propTypes = {};

function NewsSection(props) {
  return (
    <div className="news-section">
      <h1 className="news-section-title art-text">Tin tức</h1>
      <Grid container spacing={3} className="news-section-list ">
        <Grid item xs={6} md={6} lg={3} className="news-section-list-item">
          <a
            href=""
            title="SUPER CHICKEN THAM VỌNG TRỞ THÀNH THƯƠNG HIỆU FAST FOOD ĐƯỢC YÊU THÍCH
              NHẤT VIỆT NAM"
          >
            <img
              src="https://jollibee.com.vn/uploads/thumbnail/post/35bfea6e2be1b6-photo3164057428354115867386131.jpg"
              alt=""
            />
            <h3 className="news-section-list-item-title">
              SUPER CHICKEN VIỆT NAM TIẾP TỤC ĐÀ TĂNG TRƯỞNG SAU GIÃN CÁCH
            </h3>
          </a>
        </Grid>
        <Grid item xs={6} md={6} lg={3} className="news-section-list-item">
          <a href="">
            <img
              src="https://jollibee.com.vn/uploads/thumbnail/post/9ae7d128fcbee1-thumbnailanh87881640402948.jpg"
              alt=""
            />
            <h3 className="news-section-list-item-title">
              SUPER CHICKEN THAM VỌNG TRỞ THÀNH THƯƠNG HIỆU FAST FOOD ĐƯỢC YÊU
              THÍCH NHẤT VIỆT NAM
            </h3>
          </a>
        </Grid>
        <Grid item xs={6} md={6} lg={3} className="news-section-list-item">
          <a href="">
            <img
              src="https://jollibee.com.vn/uploads/thumbnail/post/d3bcb5e267aff3-image006.jpg"
              alt=""
            />
            <h3 className="news-section-list-item-title">
              KHÁM PHÁ NHÀ MÁY ĐẠT CHUẨN ISO 22000: 2018 CỦA SUPER CHICKEN
            </h3>
          </a>
        </Grid>
        <Grid item xs={6} md={6} lg={3} className="news-section-list-item">
          <a href="">
            <img
              src="https://jollibee.com.vn/uploads/thumbnail/post/ce17e25a745d3d-1600524922w50063841568619115.png"
              alt=""
            />
            <h3 className="news-section-list-item-title">
              NHÀ MÁY MỚI SUPER CHICKEN VIỆT NAM NHẬN ĐƯỢC ISO 22000:2018
            </h3>
          </a>
        </Grid>
      </Grid>
      <ArtBtn style="btn2" content="Xem thêm" />
    </div>
  );
}

export default NewsSection;
