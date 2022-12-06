import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { CardMedia } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";
import banner1 from "../../../../assets/images/banner1.jpg";
import banner2 from "../../../../assets/images/banner2.png";
import banner3 from "../../../../assets/images/banner3.jpg";
import banner4 from "../../../../assets/images/banner4.jpg";
import banner5 from "../../../../assets/images/banner5.jpg";
Carousel.propTypes = {};

function Carousel(props) {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="banner-section">
      <Slider {...settings}>
        <a className="banner" href={""}>
          <CardMedia component="img" image={banner1} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={banner2} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={banner3} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={banner4} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={banner5} alt="Jollibee" />
        </a>
      </Slider>
    </div>
  );
}

export default Carousel;
