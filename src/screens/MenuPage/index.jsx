import React from "react";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuPageHeader from "../../components/customer/MenuPage/MenuPageHeader";
import MenuPageContent from "../../components/customer/MenuPage/MenuPageContent";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
function MenuPage(props) {
  return (
    <div className="menu-page">
      <Carousel />
      <MenuPageHeader />
      <MenuPageContent />
      <CartContainer />
    </div>
  );
}

export default MenuPage;
