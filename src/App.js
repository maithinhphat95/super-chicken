import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import UserInfor from "./components/customer/ProfilePage/UserInfo";
import { DefaultLayout } from "./layout";
import {
  closeActionList,
  closeSideBar,
} from "./redux/features/DrawerSlice/drawerSlice";
import { publicRoutes } from "./routes";

function App() {
  const dispatch = useDispatch();
  return (
    <div
      className="App"
      onClick={() => {
        dispatch(closeActionList());
        dispatch(closeSideBar());
      }}
    >
      <Routes>
        <Route element={<DefaultLayout />}>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
