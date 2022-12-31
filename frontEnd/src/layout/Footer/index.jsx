import React from "react";
import "./style.scss";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import logo from "../../assets/images/logo.png";
import { FaFacebook, FaGooglePlus } from "react-icons/fa";
Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <Grid container spacing={2} className="footer-row">
        <Grid item xs={3} sx={{ display: { xs: "none", lg: "block" } }}>
          <div className="footer-col">
            <img src={logo} alt="" className="footer-logo" />
          </div>
        </Grid>
        <Grid item className="footer-col" xs={12} sm={6} md={4} lg={3}>
          <h3>CÔNG TY TNHH SUPER CHICKEN VIỆT NAM</h3>
          <p>
            Địa chỉ: Lầu 5, tòa nhà SCIC, 16 Trương Định, Phường Võ Thị Sáu,
            Quận 3, Tp. Hồ Chí Minh, Việt Nam
          </p>
          <a href="tel:02839309168">Điện thoại: (028) 39309168</a>
          <a href="tel:19001533">Tổng đài: 1900-1533</a>
          <p>Email: jbvnfeedback@jollibee.com.vn</p>
          <p>Mã số thuế: 0303883266</p>
          <p>Ngày cấp: 15/07/2008</p>
          <p>Nơi cấp: Cục Thuế Hồ Chí Minh</p>
        </Grid>
        <Grid item className="footer-col" xs={12} sm={6} md={4} lg={3}>
          <a href="tel:19001533" title="GIAO HÀNG TẬN NƠI">
            <img
              src="https://jollibee.com.vn/images/home/delivery-lg.png"
              alt=""
            />
          </a>
          <a href="https://jollibee.com.vn/chinh-sach-va-quy-dinh-chung">
            Chính sách và quy định chung
          </a>
          <a href="https://jollibee.com.vn/chinh-sach-hoat-dong">
            Chính sách hoạt động
          </a>
          <a href="https://jollibee.com.vn/chinh-sach-thanh-toan-khi-dat-hang">
            Chính sách thanh toán khi đặt hàng
          </a>
          <a href="https://jollibee.com.vn/thong-tin-van-chuyen-va-giao-nhan">
            Thông tin vận chuyển và giao nhận
          </a>
          <a href="https://jollibee.com.vn/thong-tin-dang-ky-giao-dich-chung">
            Thông tin đăng ký giao dịch chung
          </a>
          <a href="https://jollibee.com.vn/chinh-sach-bao-mat">
            Chính sách bảo mật thông tin
          </a>
        </Grid>
        <Grid item className="footer-col" xs={12} sm={6} md={4} lg={3}>
          <h3>HÃY KẾT NỐI VỚI CHÚNG TÔI</h3>
          <div className="social-list d-flex">
            <FaFacebook size="52px" />
            <FaGooglePlus size="52px" />
          </div>
          <img src="https://jollibee.com.vn/images/bocongthuong.png" alt="" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
