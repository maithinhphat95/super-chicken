import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
function CartItem(props) {
  const { item, index, handleChangeQuantity } = props;
  const [quantity, setQuantity] = useState(Number(item.quantity));

  const handleChange = (e) => {
    setQuantity(e.target.value);
    handleChangeQuantity(e.target.value, index);
  };

  useEffect(() => {
    setQuantity(Number(item.quantity));
  }, [item]);

  return (
    <div key={index} className="cart-list-item">
      <div className="cart-list-item-row">
        <div className="cart-list-item-name art-text">
          {item.name} x {item.quantity}
        </div>
        <div className="cart-list-item-quantity">
          <button
            className="cart-list-item-quantity-btn"
            title="Giảm"
            onClick={() => {
              setQuantity(Number(quantity) > 1 ? Number(quantity) - 1 : 1);
              handleChangeQuantity("decrease", index);
            }}
          >
            -
          </button>
          <input
            className="cart-list-item-quantity-inp"
            type="number"
            name=""
            id=""
            min={1}
            value={quantity}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            className="cart-list-item-quantity-btn"
            title="Tăng"
            onClick={() => {
              setQuantity(Number(quantity) + 1);
              handleChangeQuantity("increase", index);
            }}
          >
            +
          </button>
          <a
            className="cart-list-item-delete"
            title="Xóa"
            onClick={(e) => {
              handleChangeQuantity("delete", index);
            }}
          >
            <FaTrash />
          </a>
        </div>
      </div>
      <div className="cart-list-item-row">
        <div className="cart-list-item-description">{item.description}</div>
        <div className="cart-list-item-price art-text">
          {Number(item.subPrice).toLocaleString()}
          <span> đ</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
