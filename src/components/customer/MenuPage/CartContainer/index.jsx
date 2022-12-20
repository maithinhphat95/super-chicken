import React, { useEffect } from "react";
import { FaOpencart, FaShoppingCart, FaTrash } from "react-icons/fa";
import {
  BsCart2,
  BsCart3,
  BsChevronDoubleUp,
  BsChevronDoubleDown,
  BsChevronCompactDown,
  BsChevronCompactUp,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../../../redux/features/Cart/cartSlice";
import ArtBtn from "../../../common/ArtBtn";
import { Box } from "@mui/material";
function CartContainer(props) {
  const openCart = useSelector((state) => state.cart.isOpenCart);
  const dispatch = useDispatch();
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  const handleScroll = () => {
    console.log(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      className={`cart ${openCart && "cart-show"}`}
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
          {openCart ? (
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
            <BsCart3 className="cart-btn-payment-icon" />
            <p className="cart-btn-payment-price">10,000 đ</p>
          </div>
          <ArtBtn content="Thanh toán" style="btn2" />
        </div>
      </div>

      {/* List */}
      <div className="cart-list scroll-custom ">
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn" title="Giảm">
                -
              </button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn" title="Tăng">
                +
              </button>
              <a className="cart-list-item-delete" title="Xóa">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">20,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
        {/* Item */}
        <div className="cart-list-item">
          <div className="cart-list-item-row">
            <div className="cart-list-item-description art-text">
              KHOAI TÂY LẮC VỊ BBQ (LỚN)
            </div>
            <div className="cart-list-item-quantity">
              <button className="cart-list-item-quantity-btn">-</button>
              <input
                className="cart-list-item-quantity-inp"
                type="number"
                name=""
                id=""
                min={1}
                defaultValue={1}
              />
              <button className="cart-list-item-quantity-btn">+</button>
              <a className="cart-list-item-delete">
                <FaTrash />
              </a>
            </div>
          </div>
          <div className="cart-list-item-row">
            <div className="cart-list-item-description">
              1 ga gion vui ve1111111111 222222222222222
            </div>
            <div className="cart-list-item-price art-text">200,000 đ</div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default CartContainer;
