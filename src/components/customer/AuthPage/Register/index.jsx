import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerSchema } from "../../../../constant/schema";
import { auth } from "../../../../firebase/config";
import ArtBtn from "../../../common/ArtBtn";
import NotiDialog from "../../../common/NotiDialog";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });
  // Hook Firebase
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [userLogin] = useAuthState(auth);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const dialogContent = {
    title: "Đăng ký thành công",
    message:
      "Bạn đã đăng ký thành công. Chúc mừng bạn đã là thành viên của gia đình Super Chicken",
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/");
  };

  const onHandleSubmit = async (data) => {
    // đăng ký và tự động đăng nhập
    createUserWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (error) {
      console.log(error);
      if (error.message.includes("already-in-use")) {
        toast.error("Tài khoản đã tồn tại");
        reset();
      } else {
        toast.error("Xảy ra lỗi, vui lòng kiểm tra lại");
      }
    }
  }, [error]);

  useEffect(() => {
    console.log(user);
    if (user) {
      reset();
      toast.success("Đăng ký thành công");
      setOpenDialog(true);
    }
  }, [user]);

  useEffect(() => {
    if (userLogin) {
      navigate("/");
    }
  }, [userLogin]);

  const onHandleError = (error) => {
    console.log(error);
  };

  return (
    <form
      id="register-form"
      className="form-container register-form"
      onSubmit={handleSubmit(onHandleSubmit, onHandleError)}
    >
      <ToastContainer autoClose={1500} />
      <NotiDialog
        dialogContent={dialogContent}
        open={openDialog}
        handleClose={handleCloseDialog}
      />
      <h3 className="form-title art-text">Đăng Ký Tài Khoản</h3>
      {/* Register */}
      <div className="form-control">
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

        <div className="form-control-item">
          <label>
            Mật khẩu: <span className="high-light">(*)</span>
          </label>
          <input
            type="password"
            placeholder="(Ví dụ: Abc@1234)"
            className="form-control-item-input"
            {...register("password")}
          />
          {errors?.password && (
            <p className="error-message">{errors?.password?.message}</p>
          )}
        </div>

        <div className="form-control-item">
          <label>
            Nhập Lại Mật khẩu: <span className="high-light">(*)</span>
          </label>
          <input
            type="password"
            placeholder="(Ví dụ: Abc@1234)"
            className="form-control-item-input"
            {...register("passwordConfirm")}
          />
          {errors?.passwordConfirm && (
            <p className="error-message">{errors?.passwordConfirm?.message}</p>
          )}
        </div>
      </div>
      {/* Form Action */}
      <Stack direction="row" justifyContent={"center"} spacing={1}>
        <Box>
          <ArtBtn content="Đăng ký" style="btn2" type="submit" />
        </Box>
        <Box>
          <ArtBtn content="Đăng nhập" type="button" url="/login" />
        </Box>
      </Stack>
    </form>
  );
}
