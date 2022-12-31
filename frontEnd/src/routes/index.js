import BonusPage from "../screens/BonusPage";
import HomePage from "../screens/HomePage";
import MenuPage from "../screens/MenuPage";
import ServicePage from "../screens/ServicePage";
import NewsPage from "../screens/NewsPage";
import StorePage from "../screens/StorePage";
import InstroPage from "../screens/InstroPage";
import ContactPage from "../screens/ContactPage";
import CareerPage from "../screens/CareerPage";
import PaymentPage from "../screens/PaymentPage";
import ProfilePage from "../screens/ProfilePage";
import RegisterPage from "../screens/RegisterPage";
import LoginPage from "../screens/LoginPage";

// Public routes: use for un-register user
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/menu", component: MenuPage },
  { path: "/menu/:initCategory", component: MenuPage },
  { path: "/bonus", component: BonusPage },
  { path: "/service", component: ServicePage },
  { path: "/news", component: NewsPage },
  { path: "/store", component: StorePage },
  { path: "/instroduce", component: InstroPage },
  { path: "/contact", component: ContactPage },
  { path: "/career", component: CareerPage },
  { path: "/payment", component: PaymentPage },
  // { path: "/profile", component: ProfilePage },
  { path: "/profile/*", component: ProfilePage },
  { path: "/register", component: RegisterPage },
  { path: "/login", component: LoginPage },
];
// private routes: use for registered user
// export const privateRoutes = [{ path: "/admin", component: AdminPage }];

export const routesPath = {
  HOME: "/",
  MENU: "/menu",
  BONUS: "/bonus",
  SERVICE: "/service",
  NEWS: "/news",
  STORE: "/store",
  INTRODUCE: "/instroduce",
  CONTACT: "/contact",
  CAREER: "/career",
  PAYMENT: "/payment",
  PROFILE: "/profile",
  AUTH: "/authorization",
  REGISTER: "/register",
  LOGIN: "/login",
};
