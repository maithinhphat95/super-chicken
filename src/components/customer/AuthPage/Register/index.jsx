import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../../../../constant/schema";
import ArtBtn from "../../../common/ArtBtn";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userSchema),
  });

  const onHandleSubmit = () => {};
  const onHandleError = (error) => {
    console.log(error);
  };
  return (
    <form
      className="form-container register-form"
      onSubmit={handleSubmit(onHandleSubmit, onHandleError)}
    >
      <h3 className="form-title art-text">Đăng Ký Tài Khoản</h3>
      {/* Register */}
      <div className="form-control">
        {/* Name */}
        <div className="form-control-item">
          <label>
            Tên: <span className="high-light">(*)</span>
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
            <p className="error-message">{errors?.passConfirm?.message}</p>
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
            <p className="error-message">{errors?.address?.message}</p>
          )}
        </div>
      </div>
      {/* Form Action */}
      <div className="form-action">
        <ArtBtn content="Đăng ký" style="btn2" type="submit" />
      </div>
    </form>
  );
}
