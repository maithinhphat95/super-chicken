import React from "react";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuPageHeader from "../../components/customer/MenuPage/MenuPageHeader";
import MenuPageContent from "../../components/customer/MenuPage/MenuPageContent";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
import images from "../../assets/images";
import PageCover from "../../components/common/PageCover";
function MenuPage(props) {
  return (
    <PageCover className="menu-page">
      <Carousel />
      <MenuPageHeader />
      <MenuPageContent />
      <CartContainer />
    </PageCover>
  );
}

export default MenuPage;
