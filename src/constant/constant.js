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
    url: "",
  },
  {
    title: "COMBO",
    category: "combo",
    url: "",
  },
  {
    title: "GÀ GIÒN VUI VẺ",
    category: "friedChicken",
    url: "",
  },
  {
    title: "GÀ SỐT CAY",
    category: "spicyChicken",
    url: "",
  },
  {
    title: "MỲ Ý SỐT BÒ BẰM",
    category: "spaghetti",
    url: "",
  },
  {
    title: "BURGER & CƠM",
    category: "burger",
    url: "",
  },
  {
    title: "PHẦN ĂN PHỤ",
    category: "sideDish",
    url: "",
  },
  {
    title: "MÓN TRÁNG MIỆNG",
    category: "dessert",
    url: "",
  },
];
