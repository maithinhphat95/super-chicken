import React, { useEffect, useState } from "react";
import { ref, onValue, query } from "firebase/database";
import { Badge, Box } from "@mui/material";
import {
  BsCart3,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  deleteItem,
  initCart,
  toggleCart,
} from "../../../../redux/features/CartSlice/cartSlice";
import ArtBtn from "../../../common/ArtBtn";
import CartItem from "../CartItem";
import "./style.scss";
import { database } from "../../../../firebase/config";
function CartContainer(props) {
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [discounts, setDiscounts] = useState([]);
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const discountsRef = ref(database, "discounts");
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
          ...cartState?.cartList[index],
          quantity: cartState?.cartList[index].quantity + 1,
        })
      );
    } else if (value === "decrease") {
      dispatch(
        changeQuantity({
          ...cartState?.cartList[index],
          quantity:
            cartState?.cartList[index].quantity > 1
              ? cartState?.cartList[index].quantity - 1
              : 1,
        })
      );
    } else if (value === "delete") {
      dispatch(deleteItem(index));
    } else {
      dispatch(
        changeQuantity({
          ...cartState?.cartList[index],
          quantity: Number(value),
        })
      );
    }
  };

  useEffect(() => {
    onValue(query(discountsRef), (snapshots) => {
      setDiscounts(snapshots.val());
    });
  }, []);

  useEffect(() => {
    let maxDiscount = 0;
    discounts.forEach((discount) => {
      if (
        Number(cartState?.totalPrice) > Number(discount.condition) &&
        discount?.value > maxDiscount
      ) {
        maxDiscount = discount?.value;
      }
      setCurrentDiscount(maxDiscount);
    });
  }, [discounts, cartState]);

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

        <div className="cart-btn-payment  ">
          <div>
            <Badge badgeContent={cartState.totalQuantity} color="error">
              <BsCart3 className="cart-btn-payment-icon" />
            </Badge>
            <div>
              <p className="cart-btn-payment-price art-text">
                {Number(
                  cartState?.totalPrice * (1 - currentDiscount / 100)
                ).toLocaleString()}{" "}
                đ
              </p>
              {currentDiscount > 0 && (
                <p className="cart-btn-payment-price-old">
                  <span>{cartState?.totalPrice?.toLocaleString()} đ </span>
                  {"(-" + currentDiscount + "%)"}
                </p>
              )}
            </div>
          </div>
          <ArtBtn content="Thanh toán" style="btn2" url={"/payment"} />
        </div>
      </div>

      {/* List */}
      <div className="cart-list scroll-custom ">
        {/* Item */}
        {cartState?.cartList?.length > 0
          ? cartState?.cartList.map((item, index) => {
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
