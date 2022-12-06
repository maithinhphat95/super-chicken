import BonusPage from "../screens/BonusPage";
import HomePage from "../screens/HomePage";
import MenuPage from "../screens/MenuPage";
import ServicePage from "../screens/ServicePage";
import NewsPage from "../screens/NewsPage";
import StorePage from "../screens/StorePage";
import InstroPage from "../screens/InstroPage";
import ContactPage from "../screens/ContactPage";
import CareerPage from "../screens/CareerPage";

// Public routes: use for un-register user
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/menu", component: MenuPage },
  { path: "/bonus", component: BonusPage },
  { path: "/service", component: ServicePage },
  { path: "/news", component: NewsPage },
  { path: "/store", component: StorePage },
  { path: "/instroduce", component: InstroPage },
  { path: "/contact", component: ContactPage },
  { path: "/career", component: CareerPage },
];
// private routes: use for registered user
// export const privateRoutes = [{ path: "/admin", component: AdminPage }];
