import "./App.scss";
import React, { Fragment, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./layout";
import { useDispatch } from "react-redux";
import {
  closeActionList,
  closeSideBar,
} from "./redux/features/DrawerSlice/drawerSlice";

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
        {publicRoutes.map((route, index) => {
          const Layout = route.layout === null ? Fragment : DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
