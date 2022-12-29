import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import * as yup from "yup";
import { auth } from "../../../../firebase/config";
import ArtBtn from "../../../common/ArtBtn";
import ConfirmDialog from "../../../common/ConfirmDialog";
import NotiDialog from "../../../common/NotiDialog";
import "./style.scss";
const birthDayRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const schema = yup.object().shape({
  displayName: yup.string().required("Vui lòng nhập tên"),
  address: yup.string(),
  dateOfBirth: yup
    .string()
    .matches(birthDayRegex, "Vui lòng nhập sinh nhật theo cú pháp mm/dd/yyyy"),
  email: yup
    .string()
    // .required("Vui lòng nhập email")
    .email("Email sai cú pháp, vui lòng nhập lại"),
  photoURL: yup.string().url("Link hình ảnh sai cú pháp, vui lòng nhập lại"),
});

export default function UserInfor() {
  const [user] = useAuthState(auth);
  const [defaultValue, setDefaultValue] = useState({
    displayName: user?.displayName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    dateOfBirth: user?.reloadUserInfo?.dateOfBirth,
    photoURL: user?.photoURL,
  });
  const {
    register,
    handleSubmit,
    formState = { error },
    setValue,
    reset,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: defaultValue,
  });

  const [updateProfile, updating, error] = useUpdateProfile(auth);

  const [openUpdateConfirm, setOpenUpdateConfirm] = useState(false);
  const [openUpdateSuccess, setOpenUpdateSuccess] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const confirmDialogContent = {
    title: "Xác nhận cập nhật thông tin",
    message:
      "Để xác nhận cập nhật thông tin, vui lòng nhấn nút xác nhận. Xin cảm ơn.",
  };
  const successDialogContent = {
    title: "Hoàn tất cập nhật thông tin",
    message: "Thông tin cá nhân của quý khách đã được cập nhật.",
  };

  const handleOpenConfirm = async () => {
    setOpenUpdateConfirm(true);
  };
  const handleCloseConfirm = () => {
    setOpenUpdateConfirm(false);
  };
  const handleOpenSuccess = () => {
    setOpenUpdateSuccess(true);
  };
  const handleCloseSuccess = () => {
    setOpenUpdateSuccess(false);
  };

  const handleOnSubmit = async (data) => {
    const success = await updateProfile({
      ...(data?.displayName?.trim().length > 0 && {
        displayName: data?.displayName?.trim(),
      }),
      ...(data?.photoURL?.trim().length > 0 && {
        photoURL: data?.photoURL?.trim(),
      }),
    });

    if (success) {
      toast.info("Hoàn tất cập nhật thông tin");
      user.reload();
    }
    handleCloseConfirm();
    handleOpenSuccess();
  };

  //   useEffect(() => {
  //     //   reset(defaultValue, { keepDefaultValues: true });
  //     // reset((formValues) => ({
  //     //   ...formValues,
  //     //   ...defaultValue,
  //     // }));
  //     for (let key in defaultValue) {
  //       setValue(key, user[key]);
  //     }
  //   }, []);

  const handleOnError = (error) => {
    console.log(error);
    handleCloseConfirm();
    toast.error("Vui lòng nhập đầy đủ thông tin");
  };
  const handleToggleUpdate = () => {
    const inputList = document.getElementsByClassName("user-infor-input");
    for (let i = 0; i < inputList.length; i++) {
      inputList[i].disabled = !inputList[i].disabled;
    }
    setIsEdit((pre) => !pre);
  };
  return (
    <div className=" profile-user">
      <Stack direction={"column"} className="user">
        {/* Avatar */}
        <div className="user-avatar">
          <img
            src={
              user?.photoURL ||
              "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
            }
            alt=""
          />
        </div>
        {/* Title */}
        <h2 className="user-title art-text">
          Xin chào, {user?.displayName || "Quý Khách"}
        </h2>
        {/* User infor */}
        <div className="user-infor">
          <h3>Thông tin tài khoản</h3>

          <form
            className="user-infor-form"
            onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
          >
            <div className="user-infor-form-item">
              <label htmlFor="user-infor-name">
                Tên: <BsPencilSquare />{" "}
              </label>
              <input
                disabled
                // className={`user-infor-input ${
                //   error?.displayName ? "error" : ""
                // } `}
                className={`user-infor-input ${
                  error?.displayName ? "error" : ""
                }`}
                id="user-infor-name"
                defaultValue={user?.displayName}
                {...register("displayName")}
              />
            </div>
            <div className="user-infor-form-item">
              <label htmlFor="user-infor-email">Email:</label>
              <input
                disabled
                id="user-infor-email"
                className={`user-infor-input-d ${error?.email && "error"} `}
                defaultValue={user?.email}
                {...register("email")}
              />
            </div>
            <div className="user-infor-form-item">
              <label htmlFor="user-infor-phone">SĐT:</label>
              <input
                disabled
                id="user-infor-phone"
                className={`user-infor-input-d ${
                  error?.phoneNumber && "error"
                } `}
                defaultValue={user?.phoneNumber}
                {...register("phoneNumber")}
              />
            </div>
            <div className="user-infor-form-item">
              <label htmlFor="user-infor-birthDay">Sinh Nhật:</label>
              <input
                disabled
                className={`user-infor-input-d ${
                  error?.dateOfBirth && "error"
                } `}
                id="user-infor-birthDay"
                placeholder="mm/dd/yyyy"
                defaultValue={user?.reloadUserInfo?.dateOfBirth}
                {...register("dateOfBirth")}
              />
            </div>

            <div className="user-infor-form-item">
              <label htmlFor="user-infor-avatarUrl">
                Avatar Url: <BsPencilSquare />
              </label>
              <input
                disabled
                className={`user-infor-input ${error?.photoURL && "error"} `}
                type="url"
                id="user-infor-avatarUrl"
                defaultValue={user?.photoURL}
                {...register("photoURL")}
              />
            </div>
            <h3 className="error-message">
              Ghi chú: <BsPencilSquare /> Có thể chỉnh sửa
            </h3>
            <div className="user-infor-form-action">
              <ArtBtn
                type="button"
                content="Chỉnh Sửa"
                handleClick={handleToggleUpdate}
              />
              {isEdit && (
                <ArtBtn
                  type="button"
                  content="Cập nhật"
                  style="btn2"
                  handleClick={handleOpenConfirm}
                />
              )}
            </div>

            {/* Confirm update dialog */}
            {openUpdateConfirm && (
              <ConfirmDialog
                handleClose={handleCloseConfirm}
                dialogContent={confirmDialogContent}
                submit={true}
              />
            )}

            {/* Infor complete action dialog */}
            <NotiDialog
              open={openUpdateSuccess}
              handleClose={handleCloseSuccess}
              dialogContent={successDialogContent}
            />
          </form>
        </div>
      </Stack>
    </div>
  );
}
