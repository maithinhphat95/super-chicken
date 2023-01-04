import React from "react";
import { Grid } from "@mui/material";
import images from "../../assets/images";
import ArtBtn from "../../components/common/ArtBtn";
import "./style.scss";

function ServicePage(props) {
  return (
    <div className="service-page">
      <div className="service-container">
        {/* Fast Enjoy */}
        <div className="service-row">
          <Grid container spacing={2} className="service-item">
            <Grid item xs={12} md={6}>
              <div className="service-item-img">
                <img src={images.fastEnjoy} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="service-item-content">
                <h1 className="art-text">Thưởng Thức Tại Cửa Hàng</h1>
                <p>
                  Bạn đang tìm một không gian rộng rãi và tiện lợi cho bữa ăn?
                  Hãy đến ngay các cửa hàng trong chuỗi cửa hàng Super Chicken.
                  Chúng tôi cam kết bạn sẽ có những phút giây tuyệt vời.
                </p>

                <ArtBtn style="btn2" content="Xem Thêm" url="/menu" />
              </div>
            </Grid>
          </Grid>
        </div>
        {/* Tiệc Sinh Nhật */}
        <div className="service-row">
          <Grid container spacing={2} className="service-item">
            <Grid item xs={12} md={6}>
              <div className="service-item-img">
                <img src={images.party} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="service-item-content">
                <h1 className="art-text">Đặt Tiệc Sinh Nhật</h1>
                <p>
                  Bạn đang tìm ý tưởng cho một buổi tiệc sinh nhật thật đặc biệt
                  dành cho con của bạn? Hãy chọn những bữa tiệc của Super
                  Chicken. Sẽ có nhiều điều vui nhộn và rất đáng nhớ dành cho
                  con của bạn.
                </p>

                <ArtBtn style="btn2" content="Xem Thêm" url="party" />
              </div>
            </Grid>
          </Grid>
        </div>
        {/* Kid club */}
        <div className="service-row">
          <Grid container spacing={2} className="service-item">
            <Grid item xs={12} md={6}>
              <div className="service-item-img">
                <img src={images.kidClub} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="service-item-content">
                <h1 className="art-text">Super Chicken Kid Club</h1>
                <p>
                  Hãy để con bạn thoả thích thể hiện và khám phá tài năng bên
                  trong của mình cùng cơ hội gặp gỡ những bạn đồng lứa khác tại
                  Super Chicken Kids Club. Cùng tìm hiểu thêm thông tin về Super
                  Chicken Kids Club và tham gia ngay.
                </p>
                <ArtBtn style="btn2" content="Xem Thêm" url="kid-club" />
              </div>
            </Grid>
          </Grid>
        </div>
        {/* Đơn hàng lớn */}
        <div className="service-row">
          <Grid container spacing={2} className="service-item">
            <Grid item xs={12} md={6}>
              <div className="service-item-img">
                <img src={images.bigOrder} alt="" />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="service-item-content">
                <h1 className="art-text">Đơn hàng lớn</h1>
                <p>
                  Để phục vụ sở thích quây quần cùng gia đình và bạn bè, chương
                  trình chiết khấu hấp dẫn dành cho những đơn hàng lớn đã ra đời
                  để đem đến những lựa chọn tiện lợi hơn cho bạn. Liên hệ ngay
                  với cửa hàng gần nhất để được phục vụ.
                </p>
                <ArtBtn style="btn2" content="Xem Thêm" url="big-order" />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
