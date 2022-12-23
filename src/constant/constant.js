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
