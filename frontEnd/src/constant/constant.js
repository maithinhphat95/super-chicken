export const navList = [
  { content: "trang chủ", url: "/" },
  { content: "thực đơn", url: "/menu" },
  { content: "khuyến mãi", url: "/bonus" },
  { content: "dịch vụ", url: "/service" },
  { content: "tin tức", url: "/news" },
  { content: "cửa hàng", url: "/store" },
  { content: "giới thiệu", url: "/instroduce" },
  { content: "liên hệ", url: "/contact" },
  { content: "tuyển dụng", url: "/career" },
];
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAILED: "failed",
};

export const CATEGORY = {
  COMBO: "combo",
  FRIEDCHICKEN: "friedChicken",
  SPICYCHICKEN: "spicyChicken",
  SPAGHETTI: "spaghetti",
  BURFER: "burger",
  SIDEDISH: "sideDish",
  DESSERT: "dessert",
};

export const MENU_LIST = [
  {
    title: "THỰC ĐƠN",
    category: Object.values(CATEGORY),
    url: "menu",
  },
  {
    title: "COMBO",
    category: "combo",
    url: "combo",
  },
  {
    title: "GÀ GIÒN VUI VẺ",
    category: "friedChicken",
    url: "fried-chicken",
  },
  {
    title: "GÀ SỐT CAY",
    category: "spicyChicken",
    url: "spicy-chicken",
  },
  {
    title: "MỲ Ý SỐT BÒ BẰM",
    category: "spaghetti",
    url: "spaghetti",
  },
  {
    title: "BURGER & CƠM",
    category: "burger",
    url: "burger",
  },
  {
    title: "PHẦN ĂN PHỤ",
    category: "sideDish",
    url: "side-dish",
  },
  {
    title: "MÓN TRÁNG MIỆNG",
    category: "dessert",
    url: "dessert",
  },
];
export const paymentMethod = [
  {
    name: "Ship COD",
    value: "COD",
    img: "https://cdn-icons-png.flaticon.com/512/2182/2182526.png",
  },
  {
    name: "Paypal",
    value: "Paypal",
    img: "https://quyetdao.com/wp-content/uploads/2019/04/paypal-logo.png",
  },
  {
    name: "VISA / Master Card",
    value: "VISA",
    img: "https://www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png",
  },
  {
    name: "ZaloPay",
    value: "ZaloPay",
    img: "https://play-lh.googleusercontent.com/yHmIm7FYKe_dW2WHTwWizp2p_gt7_ctdpCUevX654E1dsj5c9McWO03k_S6PPLG_DNz7",
  },
  {
    name: "MoMo",
    value: "MoMo",
    img: "https://static.eos.vn/product_files/bpVJmidwaeDTo6noZqaKr6uNJGY7hygiXYJLJliC.png",
  },
];

export const shippingAgent = [
  {
    name: "Shopee Food",
    value: "shopeeFood",
    price: 20000,
    img: "http://static.ybox.vn/2022/9/4/1663234188703-Logo%20Shopee%20Food.png",
  },
  {
    name: "Grap Food",
    value: "grapFood",
    price: 25000,
    img: "https://philnews.ph/wp-content/uploads/2022/10/Grab-Food-1200x718.jpg",
  },
  {
    name: "Loship",
    value: "loship",
    price: 30000,
    img: "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Loship-Red.png",
  },
];
