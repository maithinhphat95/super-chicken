import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";
import { userSchema } from "../../constant/schema";
import "./style.scss";
function AuthorizationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  const onHandleSubmit = () => {};

  useEffect(() => {
    document.getElementById("author-container").scrollIntoView(
      { behavior: "smooth", block: "start", inline: "nearest" }
      // true
    );
  }, []);

  return (
    <PageCover className="author-page">
      <Carousel />
      <PageContainer
        id="author-container"
        className="container author-container"
      >
        <PageTitle title="Đăng ký / Đăng Nhập" />
        <div className="author-page-content">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <form
                className="form-container register-form"
                onSubmit={handleSubmit(onHandleSubmit)}
              >
                <h3 className="form-title art-text">Đăng Ký Tài Khoản</h3>
                <div className="form-control">
                  {/* Name */}
                  <div className="form-control-item">
                    <label>
                      Tên: <span>(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: Trương Văn Xuân)"
                      className="form-control-item-input"
                      {...register("name")}
                    />
                    {errors?.name && (
                      <p className="error-message">{errors?.name?.message}</p>
                    )}
                  </div>
                  {/* Phone */}
                  <div className="form-control-item">
                    <label>
                      Số điện thoại: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: 0946225334)"
                      className="form-control-item-input"
                      {...register("phone")}
                    />
                    {errors?.phone && (
                      <p className="error-message">{errors?.phone?.message}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="form-control-item">
                    <label>
                      Email: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: xuantruong@gmail.com)"
                      className="form-control-item-input"
                      {...register("email")}
                    />
                    {errors?.email && (
                      <p className="error-message">{errors?.email?.message}</p>
                    )}
                  </div>
                  {/* Password */}
                  <div className="form-control-item">
                    <label>
                      Mật khẩu: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="(Ví dụ: Abc@1234)"
                      className="form-control-item-input"
                      {...register("pass")}
                    />
                    {errors?.pass && (
                      <p className="error-message">{errors?.pass?.message}</p>
                    )}
                  </div>
                  {/* Password Confirm */}
                  <div className="form-control-item">
                    <label>
                      Nhập Lại Mật khẩu: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="(Ví dụ: Abc@1234)"
                      className="form-control-item-input"
                      {...register("passConfirm")}
                    />
                    {errors?.passConfirm && (
                      <p className="error-message">
                        {errors?.passConfirm?.message}
                      </p>
                    )}
                  </div>
                  {/* Password Confirm */}
                  <div className="form-control-item">
                    <label>
                      Nhập Lại Mật khẩu: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="(Ví dụ: Abc@1234)"
                      className="form-control-item-input"
                      {...register("passConfirm")}
                    />
                    {errors?.passConfirm && (
                      <p className="error-message">
                        {errors?.passConfirm?.message}
                      </p>
                    )}
                  </div>
                  {/* Address */}
                  <div className="form-control-item">
                    <label>
                      Địa chỉ: <span className="high-light">(*)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="(Ví dụ: Số 3 đường Trần Cao Vân, Tam Thuận, Thanh Khê, Đà Nẵng)"
                      className="form-control-item-input"
                      {...register("address")}
                    />
                    {errors?.address && (
                      <p className="error-message">
                        {errors?.address?.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </Grid>
            <Grid item xs={12} md={6}>
              Đăng Nhập
            </Grid>
          </Grid>
        </div>
      </PageContainer>
    </PageCover>
  );
}

export default AuthorizationPage;
