import React, { useEffect } from "react";
import PageCover from "../../components/common/PageCover";
import Carousel from "../../components/customer/HomePage/Carousel";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
import MenuPageContent from "../../components/customer/MenuPage/MenuPageContent";
import MenuPageHeader from "../../components/customer/MenuPage/MenuPageHeader";
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
