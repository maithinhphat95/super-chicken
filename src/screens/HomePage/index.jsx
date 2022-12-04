import React from "react";
import PropTypes from "prop-types";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuToday from "../../components/customer/HomePage/MenuToday";
import ServiceListSection from "../../components/customer/HomePage/ServiceListSection";
import StoreFindSection from "../../components/customer/HomePage/StoreFindSection";

HomePage.propTypes = {};

function HomePage(props) {
  return (
    <div className="home-page">
      <Carousel />
      <MenuToday />
      <ServiceListSection />
      <StoreFindSection />
    </div>
  );
}

export default HomePage;
