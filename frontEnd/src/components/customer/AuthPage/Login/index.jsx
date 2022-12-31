import { child, ref, set } from "@firebase/database";
import { yupResolver } from "@hookform/resolvers/yup";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import {
//   FacebookAuthProvider,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginSchema } from "../../../../constant/schema";
import { auth, database } from "../../../../firebase/config";
import { login } from "../../../../redux/features/UserSlice/userSlice";
import { routesPath } from "../../../../routes";
import ArtBtn from "../../../common/ArtBtn";
import NotiDialog from "../../../common/NotiDialog";
import "./style.scss";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const loginUser = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
    accessToken: "",
  });

  // Firebase hook
  const [user, userLoading] = useAuthState(auth);

  const [signInWithEmailAndPassword, epuser, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithFacebook, fbUser, fbLoading, fbError] =
    useSignInWithFacebook(auth);
  const [signInWithGoogle, ggUser, ggLoading, ggError] =
    useSignInWithGoogle(auth);

  const dialogContent = {
    title: "Đăng nhập thành công",
    message: "Bạn đã đăng nhập thành công",
  };

  const dbRef = ref(database);
  const usersRef = child(dbRef, "users");

  const onHandleSubmit = (data) => {
    signInWithEmailAndPassword(data?.email, data?.password);
  };

  // const registerUser = async () => {
  // };
  // if (fbUser | ggUser) {
  //   const socialUser = fbUser || ggUser;
  //   setUserData((prev) => {
  //     return {
  //       ...prev,
  //       displayName: socialUser?.displayName,
  //       email: socialUser?.email,
  //       dateOfBirth: socialUser?.reloadUserInfo?.dateOfBirth,
  //       phoneNumber: socialUser?.phoneNumber,
  //       photoURL: socialUser?.photoURL,
  //       uid: socialUser?.uid,
  //       accessToken: socialUser?.accessToken,
  //     };
  //   });
  //   console.log(userData);
  //   set(ref(usersRef, socialUser.uid), userData);
  // }

  const onHandleError = (error) => {
    console.log(error);
  };

  const handleLoginFb = () => {
    signInWithFacebook();
  };

  const handleLoginGg = () => {
    signInWithGoogle();
  };

  const handleCloseDialog = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (userLoading & loginUser.isLogin) {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    const currentError = error || fbError || ggError;
    if (currentError) {
      console.log(currentError);
      if (currentError.message.includes("user-not-found")) {
        toast.error("Tài khoản không tồn tại");
        reset();
      } else if (currentError.message.includes("wrong-password")) {
        toast.error("Sai mật khẩu");
        reset();
      } else if (currentError.message.includes("too-many-requests")) {
        toast.error(
          "Nhập sai nhiều lần, tài khoản tạm thời bị vô hiệu. Vui lòng thử lại sau."
        );
      } else if (
        currentError.message.includes(
          "account-exists-with-different-credential"
        )
      ) {
        toast.error(
          "Tài khoản có email trùng với 1 tài khoản khác. Vui lòng kiểm tra lại"
        );
      } else {
        toast.error("Xảy ra lỗi, vui lòng kiểm tra lại");
      }
    }
  }, [error, fbError, ggError]);

  useEffect(() => {
    if (user) {
      reset();
      toast.success("Đăng nhập thành công");
      const userInfor = {
        name: user?.displayName || "",
        email: user?.email,
        accessToken: user?.accessToken,
      };
      dispatch(login(userInfor));
      setOpenDialog(true);
    }
  }, [user]);

  return (
    <form
      id="login-form"
      className="form-container login-form "
      onSubmit={handleSubmit(onHandleSubmit, onHandleError)}
    >
      <ToastContainer autoClose={1500} pauseOnHover={false} />
      <NotiDialog
        dialogContent={dialogContent}
        open={openDialog}
        handleClose={handleCloseDialog}
      />
      <h3 className="form-title art-text">Đăng Nhập</h3>
      {/* Login */}
      <div className="form-control">
        {/* Phone */}
        <div className="form-control-item">
          <label>
            Email: <span className="high-light">(*)</span>
          </label>
          <input
            type="text"
            placeholder="(Ví dụ: abc123@gmail.com)"
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
            autoFocus
            className="form-control-item-input"
            {...register("password")}
          />
          {errors?.password && (
            <p className="error-message">{errors?.password?.message}</p>
          )}
        </div>
      </div>
      {/* Form Action */}
      <div className="form-action art-text">
        <ArtBtn
          content="Đăng Nhập"
          style="btn2"
          type="submit"
          form="login-form"
        />
        <button
          type="button"
          className="login-action login-facebook custom-hover"
          onClick={handleLoginFb}
        >
          <FaFacebookSquare /> Đăng nhập bằng Facebook
        </button>
        <button
          type="button"
          className="login-action login-google custom-hover"
          onClick={handleLoginGg}
        >
          <FaGoogle /> Đăng nhập bằng Google
        </button>
        <div>
          <Link to={routesPath.REGISTER} className="nor-text register-link">
            Bạn chưa có tài khoản, đăng ký ngay
          </Link>
        </div>
      </div>
    </form>
  );
}
