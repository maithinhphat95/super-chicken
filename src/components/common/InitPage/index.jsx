import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../../../redux/features/DrawerSlice/drawerSlice";

export default function InitPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar);
  }, []);
  return <></>;
}
