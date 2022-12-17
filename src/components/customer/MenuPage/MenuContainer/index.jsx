import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../../../apis/axiosClient";
import { productApi } from "../../../../apis/productApi";
import { MENU_LIST } from "../../../../constant/constant";
import { closeSideBar } from "../../../../redux/features/OpenSideBar/openSideBar";
import { fetchProduct } from "../../../../redux/features/Product/productSlice";
import MenuRow from "../MenuRow";
import "./style.scss";

function MenuContainer() {
  const dispatch = useDispatch();
  const productStates = useSelector((state) => state.product);

  const [products, setProducts] = useState({
    combo: [],
    friedChicken: [],
    spicyChicken: [],
    spaghetti: [],
    burger: [],
    sideDish: [],
    dessert: [],
  });
  const [loading, setLoading] = useState({
    combo: false,
    friedChicken: false,
    spicyChicken: false,
    spaghetti: false,
    burger: false,
    sideDish: false,
    dessert: false,
  });
  const [loadMore, setLoadMore] = useState({
    combo: true,
    friedChicken: true,
    spicyChicken: true,
    spaghetti: true,
    burger: true,
    sideDish: true,
    dessert: true,
  });
  const [optionFetchCombo, setOptionFetchCombo] = useState({
    category: "combo",
    limit: 4,
  });
  const [optionFetchFriedChicken, setOptionFetchFriedChicken] = useState({
    category: "friedChicken",
    limit: 4,
  });
  const [optionFetchSpicyChicken, setOptionFetchSpicyChicken] = useState({
    category: "spicyChicken",
    limit: 4,
  });
  const [optionFetchSpaghetti, setOptionFetchSpaghetti] = useState({
    category: "spaghetti",
    limit: 4,
  });
  const [optionFetchBurger, setOptionFetchBurger] = useState({
    category: "burger",
    limit: 4,
  });
  const [optionFetchSideDish, setOptionFetchSideDish] = useState({
    category: "sideDish",
    limit: 4,
  });
  const [optionFetchDessert, setOptionFetchDessert] = useState({
    category: "dessert",
    limit: 4,
  });

  // async funtion fetch data
  const fetchData = async (category, option) => {
    setLoading((prev) => {
      return { ...prev, [category]: true };
    });
    try {
      const res = await productApi.getData(option);
      const total = Number(res.headers["x-total-count"]);

      if (res.data.length >= total) {
        setLoadMore((prev) => {
          return { ...prev, [category]: false };
        });
      }

      setProducts((prev) => {
        return { ...prev, [category]: res.data };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prev) => {
        return { ...prev, [category]: false };
      });
    }
  };

  const handleLoadMore = (category) => {
    switch (category) {
      case "combo":
        setOptionFetchCombo((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      case "friedChicken":
        setOptionFetchFriedChicken((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      case "spicyChicken":
        setOptionFetchSpicyChicken((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      case "spaghetti":
        setOptionFetchSpaghetti((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      case "burger":
        setOptionFetchBurger((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;

      case "sideDish":
        setOptionFetchSideDish((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      case "dessert":
        setOptionFetchDessert((pre) => {
          return {
            ...pre,
            limit: pre.limit + 4,
          };
        });
        break;
      default:
        break;
    }
  };

  // Fetch Combo
  useEffect(() => {
    fetchData("combo", optionFetchCombo);
  }, [optionFetchCombo]);

  // Fetch friedChicken
  useEffect(() => {
    fetchData("friedChicken", optionFetchFriedChicken);
  }, [optionFetchFriedChicken]);

  // Fetch spicyChicken
  useEffect(() => {
    fetchData("spicyChicken", optionFetchSpicyChicken);
  }, [optionFetchSpicyChicken]);

  // Fetch Spaghetti
  useEffect(() => {
    fetchData("spaghetti", optionFetchSpaghetti);
  }, [optionFetchSpaghetti]);

  // Fetch Burger and Price
  useEffect(() => {
    fetchData("burger", optionFetchBurger);
  }, [optionFetchBurger]);

  // Fetch Side Dish
  useEffect(() => {
    fetchData("sideDish", optionFetchSideDish);
  }, [optionFetchSideDish]);

  // Fetch Dessert
  useEffect(() => {
    fetchData("dessert", optionFetchDessert);
  }, [optionFetchDessert]);

  // Init page
  useEffect(() => {
    dispatch(closeSideBar());
  }, []);
  console.log(products);

  return (
    <div className="menu-container art-text">
      <div className="menu">
        <h1 className="menu-title">Thực Đơn</h1>
        {/* Combo Category */}
        <MenuRow
          title="Combo"
          loading={loading.combo}
          loadMore={loadMore.combo}
          products={products.combo}
          handleLoadMore={() => {
            handleLoadMore("combo");
          }}
        />
        {/* Fried Chicken Category */}
        <MenuRow
          title="Gà Giòn Vui Vẻ"
          loading={loading.friedChicken}
          loadMore={loadMore.friedChicken}
          products={products.friedChicken}
          handleLoadMore={() => {
            handleLoadMore("friedChicken");
          }}
        />
        {/* Spicy Chicken Category */}
        <MenuRow
          title="Gà Sốt Cay"
          loading={loading.spicyChicken}
          loadMore={loadMore.spicyChicken}
          products={products.spicyChicken}
          handleLoadMore={() => {
            handleLoadMore("spicyChicken");
          }}
        />
        {/* Spaghetti Category */}
        <MenuRow
          title="Mỳ Ý Sốt Bò Bằm"
          loading={loading.spaghetti}
          loadMore={loadMore.spaghetti}
          products={products.spaghetti}
          handleLoadMore={() => {
            handleLoadMore("spaghetti");
          }}
        />
        {/* Burger Category */}
        <MenuRow
          title="Burger & Cơm"
          loading={loading.burger}
          loadMore={loadMore.burger}
          products={products.burger}
          handleLoadMore={() => {
            handleLoadMore("burger");
          }}
        />
        {/* Side Dish Category */}
        <MenuRow
          title="Phần Ăn Phụ"
          loading={loading.sideDish}
          loadMore={loadMore.sideDish}
          products={products.sideDish}
          handleLoadMore={() => {
            handleLoadMore("sideDish");
          }}
        />
        {/* Dessert Category */}
        <MenuRow
          title="Món Tráng Miệng"
          loading={loading.dessert}
          loadMore={loadMore.dessert}
          products={products.dessert}
          handleLoadMore={() => {
            handleLoadMore("dessert");
          }}
        />
      </div>
    </div>
  );
}

export default MenuContainer;
