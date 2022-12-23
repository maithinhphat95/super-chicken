import React, { useEffect } from "react";

import {
  BsCart3,
  BsChevronDoubleUp,
  BsChevronDoubleDown,
} from "react-icons/bs";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  deleteItem,
  initCart,
  toggleCart,
} from "../../../../redux/features/Cart/cartSlice";
import ArtBtn from "../../../common/ArtBtn";
import { Badge, Box } from "@mui/material";
import CartItem from "../CartItem";
import { Link } from "react-router-dom";
function CartContainer(props) {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleScroll = () => {
    console.log(window.pageYOffset);
  };

  const handleChangeQuantity = (value, index) => {
    if (value === "increase") {
      dispatch(
        changeQuantity({
          ...cartState.cartList[index],
          quantity: cartState.cartList[index].quantity + 1,
        })
      );
    } else if (value === "decrease") {
      dispatch(
        changeQuantity({
          ...cartState.cartList[index],
          quantity:
            cartState.cartList[index].quantity > 1
              ? cartState.cartList[index].quantity - 1
              : 1,
        })
      );
    } else if (value === "delete") {
      dispatch(deleteItem(index));
    } else {
      dispatch(
        changeQuantity({
          ...cartState.cartList[index],
          quantity: Number(value),
        })
      );
    }
  };
  // Init Cart From local Storage
  useEffect(() => {
    dispatch(initCart());
  }, []);

  // Listen scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      className={`cart ${cartState.isOpenCart && "cart-show"}`}
      sx={{ marginRight: { xs: 0, md: "40px" } }}
    >
      {/* Button */}
      <div
        className="cart-btn"
        onClick={() => {
          handleToggleCart();
        }}
      >
        <div className="cart-btn-arrow">
          {cartState.isOpenCart ? (
            <p>
              <BsChevronDoubleDown /> Nhấn vào đây để ẩn giỏ hàng
            </p>
          ) : (
            <p>
              <BsChevronDoubleUp /> Nhấn vào đây để hiện giỏ hàng
            </p>
          )}
        </div>

        <div className="cart-btn-payment  art-text">
          <div>
            <Badge badgeContent={cartState.totalQuantity} color="error">
              <BsCart3 className="cart-btn-payment-icon" />
            </Badge>
            <p className="cart-btn-payment-price">
              {cartState.totalPrice.toLocaleString()} đ
            </p>
          </div>
          <ArtBtn content="Thanh toán" style="btn2" url={"/payment"} />
        </div>
      </div>

      {/* List */}
      <div className="cart-list scroll-custom ">
        {/* Item */}
        {cartState.cartList.length > 0
          ? cartState.cartList.map((item, index) => {
              return (
                <CartItem
                  key={index}
                  item={item}
                  index={index}
                  handleChangeQuantity={handleChangeQuantity}
                />
              );
            })
          : "Giỏ hàng đang trống"}
      </div>
    </Box>
  );
}

export default CartContainer;
