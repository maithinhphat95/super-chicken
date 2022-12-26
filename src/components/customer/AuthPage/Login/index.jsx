import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { userSchema } from "../../../../constant/schema";
import ArtBtn from "../../../common/ArtBtn";
export default function Login() {
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
      className="form-container login-form"
      onSubmit={handleSubmit(onHandleSubmit, onHandleError)}
    >
      <h3 className="form-title art-text">Đăng Nhập</h3>
      {/* Login */}
      <div className="form-control">
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
      </div>
      {/* Form Action */}
      <div className="form-action">
        <ArtBtn content="Đăng Nhập" style="btn2" type="submit" />
        <Button variant="contained">Đăng nhập bằng Facebook</Button>
        <ArtBtn content="Đăng Nhập" style="btn2" type="submit" />
      </div>
    </form>
  );
}
