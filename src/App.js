import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
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
