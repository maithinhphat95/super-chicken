import React from "react";
import PropTypes from "prop-types";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuToday from "../../components/customer/HomePage/MenuToday";
import ServiceListSection from "../../components/customer/HomePage/ServiceListSection";
import NewsSection from "../../components/customer/HomePage/NewsSection";

function HomePage(props) {
  return (
    <div className="home-page">
      <Carousel />
      <MenuToday />
      <ServiceListSection />
      <NewsSection />
    </div>
  );
}

export default HomePage;
