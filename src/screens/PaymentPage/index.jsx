import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArtBtn from "../../components/common/ArtBtn";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import { paymentMethod, shippingAgent } from "../../constant/constant";
import { paymentSchema } from "../../constant/paymentSchema";
import { initCart } from "../../redux/features/Cart/cartSlice";
import { addOrder } from "../../redux/features/Order/orderSlice";
import "./style.scss";

function PaymentPage(props) {
  const {} = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(paymentSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const [showDialog, setShowDialog] = useState(false);
  const [shipFee, setShipFee] = useState(0);

  const handleChangeShip = (agentCode, price) => {
    if (shipFee !== price) {
      setShipFee(Number(price));
    }
  };

  const onSubmit = (data) => {
    dispatch(addOrder({ ...data, shipFee: shipFee }));
    setShowDialog(false);
  };

  const onError = (error, e) => {
    setShowDialog(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(initCart());
  }, []);

  return (
    <PageCover className="payment-page">
      <PageContainer>
        <div className="payment-container container">
          <ToastContainer
            pauseOnHover={false}
            theme={"light"}
            autoClose="2000"
          />
          <PageTitle title="Thanh Toán" />
          <div className="payment-page-content ">
            <form
              className="payment"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="payment-delivery">
                    <h3 className="payment-delivery-title art-text">
                      Thông tin người nhận
                    </h3>
                    <div className="payment-delivery-form">
                      <div className="payment-delivery-form-item">
                        <label>
                          Tên: <span>(*)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="(Ví dụ: Trương Văn Xuân)"
                          className="payment-delivery-form-item-input"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="error-message">{errors.name.message}</p>
                        )}
                      </div>
                      <div className="payment-delivery-form-item">
                        <label>
                          Số Điện Thoại: <span>(*)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="(Ví dụ: 0964335664)"
                          className="payment-delivery-form-item-input"
                          {...register("phone")}
                        />
                        {errors?.phone && (
                          <p className="error-message">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div className="payment-delivery-form-item">
                        <label>
                          Địa chỉ: <span>(*)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="(Ví dụ: Số 3 đường Trần Cao Vân, Tam Thuận, Thanh Khê, Đà Nẵng)"
                          className="payment-delivery-form-item-input"
                          {...register("address")}
                        />
                        {errors?.address && (
                          <p className="error-message">
                            {errors.address.message}
                          </p>
                        )}
                      </div>
                      <div className="payment-delivery-form-item">
                        <label>Email:</label>
                        <input
                          type="text"
                          placeholder="(Ví dụ: xuantruong@gmail.com)"
                          className="payment-delivery-form-item-input"
                          {...register("email")}
                        />
                        {errors?.email && (
                          <p className="error-message">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="payment-delivery-form-item">
                        <label>Ghi chú:</label>
                        <textarea
                          rows="4"
                          cols=""
                          className="payment-delivery-form-item-input"
                          {...register("note", {
                            required: false,
                          })}
                        ></textarea>
                      </div>
                    </div>
                    <p className="payment-delivery-note">
                      <span style={{ textDecoration: "underline" }}>Chú ý</span>
                      : Phải nhập đầy đủ vào các mục <span>(*)</span>
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="payment-bill">
                    <h3 className="payment-bill-title art-text">Hóa đơn</h3>
                    <div className="payment-bill-content">
                      <div>
                        <h3>Đơn hàng của bạn:</h3>
                        <div className="payment-bill-list scroll-custom">
                          {cartState.cartList.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="payment-bill-list-item"
                              >
                                <Stack
                                  direction={"row"}
                                  className="payment-bill-list-item-infor"
                                >
                                  <img src={item.image} alt="" />
                                  <Stack
                                    direction={"column"}
                                    justifyContent="center"
                                    className="payment-bill-list-item-infor-text"
                                  >
                                    <p className="payment-bill-list-item-name">
                                      {item.name}
                                    </p>
                                    <p className="payment-bill-list-item-description">
                                      {item.description}
                                    </p>
                                  </Stack>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  className="payment-bill-list-item-amount"
                                >
                                  <p className="payment-bill-list-item-quantity art-text">
                                    x {item.quantity} =
                                  </p>
                                  <p className="payment-bill-list-item-price art-text">
                                    {Number(item.subPrice).toLocaleString()} đ
                                  </p>
                                </Stack>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="payment-bill-edit">
                        <ArtBtn
                          style="btn2"
                          content="Chỉnh sửa giỏ hàng"
                          url="/menu"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                {/* Payment Checkout */}
                <Grid item xs={12}>
                  <div className="payment-checkout">
                    <Grid container spacing={4}>
                      {/* Payment method & Delivery*/}
                      <Grid item xs={12} md={6}>
                        {/* Payment method*/}
                        <div className="payment-method-container">
                          <h3>Phương thức thanh toán</h3>
                          {errors?.paymentMethod && (
                            <p className="error-message">
                              {errors.paymentMethod.message}
                            </p>
                          )}
                          <Grid
                            container
                            spacing={0.5}
                            className="payment-method"
                          >
                            {paymentMethod.map((item, index) => {
                              return (
                                <Grid
                                  key={index}
                                  item
                                  xs={12}
                                  lg={6}
                                  className="payment-method-item"
                                >
                                  <label>
                                    <div>
                                      <input
                                        type="radio"
                                        name="payment-method"
                                        value={item.value}
                                        {...register("paymentMethod")}
                                      />
                                      <span>{item.name}</span>
                                    </div>
                                    <img src={item.img} alt="" />
                                  </label>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                        {/* Delivery option*/}
                        <div>
                          <h3>Đơn vị vận chuyển</h3>
                          {errors?.shippingAgent && (
                            <p className="error-message">
                              {errors.shippingAgent.message}
                            </p>
                          )}
                          <Grid
                            container
                            spacing={0.5}
                            className="delivery-option"
                          >
                            {shippingAgent.map((item, index) => {
                              return (
                                <Grid
                                  item
                                  key={index}
                                  className="delivery-option-item"
                                >
                                  <label>
                                    <div>
                                      <input
                                        type="radio"
                                        name="delivery"
                                        value={item.value}
                                        onClick={(e) => {
                                          handleChangeShip(
                                            item.value,
                                            item.price
                                          );
                                        }}
                                        {...register("shippingAgent")}
                                      />
                                      <span>{item.name}</span>
                                    </div>
                                    <img src={item.img} alt="" />
                                  </label>
                                </Grid>
                              );
                            })}
                          </Grid>
                        </div>
                      </Grid>

                      {/* Confirm */}
                      <Grid item xs={12} md={6}>
                        <div className="payment-confirm">
                          <p>
                            Tổng giá tiền :{" "}
                            <span className="art-text">
                              {cartState?.totalPrice?.toLocaleString()} đ
                            </span>
                          </p>
                          <p>
                            Phí vận chuyển :{" "}
                            <span className="art-text">
                              {shipFee.toLocaleString()} đ
                            </span>
                          </p>
                          <p className="payment-total art-text">
                            Tổng đơn hàng:{" "}
                            <span>
                              {(
                                shipFee + cartState.totalPrice
                              ).toLocaleString()}{" "}
                              đ
                            </span>
                          </p>
                          <div className="payment-action">
                            <ArtBtn
                              content="Hoàn tất"
                              style="btn2"
                              handleClick={() => {
                                setShowDialog(true);
                              }}
                              url={null}
                            />
                          </div>
                          {showDialog && (
                            <div className="confirm-dialog">
                              <div className="confirm-dialog-box">
                                <div className="confirm-dialog-box-header">
                                  <h3 className="art-text">
                                    Hoàn Tất Đơn Hàng
                                  </h3>
                                  <IconButton
                                    onClick={() => {
                                      setShowDialog(false);
                                    }}
                                  >
                                    <BsXLg />
                                  </IconButton>
                                </div>
                                <div className="confirm-dialog-box-content">
                                  <p>
                                    Để xác nhận thanh toán đơn hàng này, quý
                                    khách vui lòng nhấn vào nút xác nhận.
                                  </p>
                                  <p>Xin cảm ơn quý khách.</p>
                                </div>
                                <div className="confirm-dialog-box-action">
                                  <ArtBtn
                                    content="Hủy bỏ"
                                    style="btn2"
                                    handleClick={() => {
                                      setShowDialog(false);
                                    }}
                                  />
                                  <ArtBtn content="Xác nhận" type="submit" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default PaymentPage;
