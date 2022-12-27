import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { productApi } from "../../../../apis/productApi";
import PageContainer from "../../../common/PageContainer";
import PageTitle from "../../../common/PageTitle";
import MenuRow from "../MenuRow";
import "./style.scss";

function MenuPageContent() {
  const dispatch = useDispatch();
  const { initCategory } = useParams();
  const [viewTo, setViewTo] = useState(initCategory || "combo");

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

  const goTo = (topOffset) => {
    window.scrollTo({
      top: topOffset,
      behavior: "smooth",
    });
  };

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

      if (category === "dessert" && res.status) {
        const finish = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 300);
        });
        finish.then(() => {
          const element = document.getElementById(viewTo);
          const elementPosition = element.getBoundingClientRect().top;
          const offSet = elementPosition + window.pageYOffset - 140;
          goTo(offSet);
        });
      }
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

  return (
    <div className="menu-container art-text">
      <PageContainer className="container menu-container art-text">
        <div id="menu" className="menu">
          <PageTitle title="Thực đơn" />
          {/* Combo Category */}
          <MenuRow
            id={"combo"}
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
            id={"fried-chicken"}
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
            id={"spicy-chicken"}
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
            id={"spaghetti"}
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
            id={"burger"}
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
            id={"side-dish"}
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
            id={"dessert"}
            title="Món Tráng Miệng"
            loading={loading.dessert}
            loadMore={loadMore.dessert}
            products={products.dessert}
            handleLoadMore={() => {
              handleLoadMore("dessert");
            }}
          />
        </div>
      </PageContainer>
    </div>
  );
}

export default MenuPageContent;
