import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { CardMedia } from "@mui/material";
import images from "../../../../assets/images";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.scss";

Carousel.propTypes = {};

function Carousel(props) {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "carousel",
  };
  return (
    <div className="banner-section">
      <Slider {...settings}>
        <a className="banner" href={""}>
          <CardMedia component="img" image={images.banner1} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={images.banner2} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={images.banner3} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={images.banner4} alt="Jollibee" />
        </a>
        <a className="banner" href={""}>
          <CardMedia component="img" image={images.banner5} alt="Jollibee" />
        </a>
      </Slider>
    </div>
  );
}

export default Carousel;
