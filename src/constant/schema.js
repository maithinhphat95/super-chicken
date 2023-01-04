import * as yup from "yup";
import { PHONE_REGEX, PASS_REGEX } from "./regex";
export const paymentSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên người nhận"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại người nhận")
    .matches(PHONE_REGEX, "Số điện thoại sai cú pháp, vui lòng nhập lại"),
  address: yup.string().required("Vui lòng nhập địa chỉ người nhận"),
  email: yup.string().email("Email sai cú pháp, vui lòng nhập lại"),
  paymentMethod: yup
    .string()
    .required("Vui lòng chọn 1 phương thức thanh toán")
    .typeError("Vui lòng chọn 1 phương thức thanh toán"),
  shippingAgent: yup
    .string()
    .required("Vui lòng chọn 1 đơn vị vận chuyển")
    .typeError("Vui lòng chọn 1 đơn vị vận chuyển"),
});

export const registerSchema = yup.object().shape({
  // name: yup.string().required("Vui lòng nhập tên"),
  phone: yup
    .string()
    // .required("Vui lòng nhập số điện thoại")
    .matches(PHONE_REGEX, "Số điện thoại sai cú pháp, vui lòng nhập lại"),
  email: yup
    .string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Email sai cú pháp, vui lòng nhập lại"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .max(32, "Mật khẩu tối đa 32 ký tự")
    .matches(
      PASS_REGEX,
      "Mật khẩu phải bao gồm 8-32 ký tự, trong đó có chữ in hoa, chữ thường, số và ký tự đặt biệt !@#$%^&*()<>"
    ),
  passwordConfirm: yup
    .string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng, vui lòng nhập lại"),
  address: yup.string(),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Vui lòng nhập địa chỉ email")
    .email("Email sai cú pháp, vui lòng nhập lại"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .max(32, "Mật khẩu tối đa 32 ký tự")
    .matches(
      PASS_REGEX,
      "Mật khẩu phải bao gồm 8-32 ký tự, trong đó có chữ in hoa, chữ thường, số và ký tự đặt biệt !@#$%^&*()<>"
    ),
});

export const searchSchema = yup.object().shape({
  searhKey: yup.string(),
  searchcategory: yup.string(),
  searchPrice: yup.array().length(2),
});
