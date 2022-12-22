import "./style.scss";
import React, { useEffect, useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { initCart } from "../../redux/features/Cart/cartSlice";
import ArtBtn from "../../components/common/ArtBtn";
import { BsXCircleFill, BsXCircle, BsXLg } from "react-icons/bs";
function PaymentPage(props) {
  const {} = props;
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const [shipFee, setShipFee] = useState(20000);
  const [showDialog, setShowDialog] = useState(false);
  const handleSubmit = () => {};
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(initCart());
  }, []);
  return (
    <div className="payment-page container">
      <PageTitle title="Thanh Toán" />
      <div className="payment-content ">
        <form className="payment" onSubmit={handleSubmit}>
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
                    />
                  </div>
                  <div className="payment-delivery-form-item">
                    <label>
                      Số Điện Thoại: <span>(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: 0964335664)"
                      className="payment-delivery-form-item-input"
                    />
                  </div>
                  <div className="payment-delivery-form-item">
                    <label>
                      Địa chỉ: <span>(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: Số 3 đường Trần Cao Vân, Tam Thuận, Thanh Khê, Đà Nẵng)"
                      className="payment-delivery-form-item-input"
                    />
                  </div>
                  <div className="payment-delivery-form-item">
                    <label>Email:</label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: xuantruong@gmail.com)"
                      className="payment-delivery-form-item-input"
                    />
                  </div>
                  <div className="payment-delivery-form-item">
                    <label>Ghi chú:</label>
                    <textarea
                      rows="3"
                      cols=""
                      className="payment-delivery-form-item-input"
                    ></textarea>
                  </div>
                </div>
                <p className="payment-delivery-note">
                  <span style={{ textDecoration: "underline" }}>Chú ý</span>:
                  Phải nhập đầy đủ vào các mục <span>(*)</span>
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
                          <div key={index} className="payment-bill-list-item">
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
            <Grid item xs={12}>
              <div className="payment-checkout">
                <Grid container spacing={4}>
                  {/* Payment method & Delivery*/}
                  <Grid item xs={12} md={6}>
                    {/* Payment method*/}
                    <div>
                      <h3>Phương thức thanh toán</h3>
                      <Grid container spacing={0.5} className="payment-method">
                        <Grid
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
                                defaultChecked
                              />
                              <span>Ship COD</span>
                            </div>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/2182/2182526.png"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          className="payment-method-item"
                        >
                          <label>
                            <div>
                              <input type="radio" name="payment-method" />
                              <span>Paypal</span>
                            </div>
                            <img
                              src="https://quyetdao.com/wp-content/uploads/2019/04/paypal-logo.png"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          className="payment-method-item"
                        >
                          <label>
                            <div>
                              <input type="radio" name="payment-method" />
                              <span>VISA / Master Card</span>
                            </div>
                            <img
                              src="https://www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          className="payment-method-item"
                        >
                          <label>
                            <div>
                              <input type="radio" name="payment-method" />
                              <span>ZaloPay</span>
                            </div>
                            <img
                              src="https://play-lh.googleusercontent.com/yHmIm7FYKe_dW2WHTwWizp2p_gt7_ctdpCUevX654E1dsj5c9McWO03k_S6PPLG_DNz7"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          lg={6}
                          className="payment-method-item"
                        >
                          <label>
                            <div>
                              <input type="radio" name="payment-method" />
                              <span>MoMo</span>
                            </div>
                            <img
                              src="https://static.eos.vn/product_files/bpVJmidwaeDTo6noZqaKr6uNJGY7hygiXYJLJliC.png"
                              alt=""
                            />
                          </label>
                        </Grid>
                      </Grid>
                    </div>
                    {/* Delivery option*/}
                    <div>
                      <h3>Đơn vị vận chuyển</h3>
                      <Grid container spacing={0.5} className="delivery-option">
                        <Grid item xs={12} className="delivery-option-item">
                          <label>
                            <div>
                              <input
                                type="radio"
                                name="delivery"
                                defaultChecked
                                value={"j&t"}
                              />
                              <span>J&T Express</span>
                            </div>
                            <img
                              src="https://vinh-cat.com.vn/wp-content/uploads/2021/01/article_1564050459_674.png"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid item xs={12} className="delivery-option-item">
                          <label>
                            <div>
                              <input
                                type="radio"
                                name="delivery"
                                value={"ghtk"}
                              />
                              <span>Giaohangtietkiem</span>
                            </div>
                            <img
                              src="https://cdn.toponseek.com/sites/2/2022/08/giao-hang-tiet-kiem-tuyen-dung.webp"
                              alt=""
                            />
                          </label>
                        </Grid>
                        <Grid item xs={12} className="delivery-option-item">
                          <label>
                            <div>
                              <input
                                type="radio"
                                name="delivery"
                                value={"ghn"}
                              />
                              <span>Giao Hang Nhanh</span>
                            </div>
                            <img
                              src="https://product.hstatic.net/1000405368/product/giao_hang_nhanh_toan_quoc_color.b7d18fe5_39425b03ee544ab2966d465756a00f89.png"
                              alt=""
                            />
                          </label>
                        </Grid>
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
                          {(shipFee + cartState.totalPrice).toLocaleString()} đ
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
                              <h3 className="art-text">Hoàn Tất Đơn Hàng</h3>
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
                                Để xác nhận đồng ý thanh toán đơn hàng này, quý
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
                              <ArtBtn content="Xác nhận" />
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
  );
}

export default PaymentPage;
