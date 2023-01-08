import { async } from "@firebase/util";
import { Stack } from "@mui/material";
import {
  endAt,
  equalTo,
  get,
  limitToFirst,
  onValue,
  orderByChild,
  query,
  ref,
  set,
  startAt,
} from "firebase/database";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../../../../apis/productApi";
import { database } from "../../../../firebase/config";
import PageContainer from "../../../common/PageContainer";
import PageTitle from "../../../common/PageTitle";
import MenuRow from "../MenuRow";
import "./style.scss";
function MenuPageContent() {
  const productRef = ref(database, "products");
  const { initCategory } = useParams();
  const [viewTo, setViewTo] = useState(initCategory || "menu");
  const [firstLoad, setFirstLoad] = useState(true);
  const [subTotal, setSubTotal] = useState({
    combo: 0,
    friedChicken: 0,
    spicyChicken: 0,
    spaghetti: 0,
    burger: 0,
    sideDish: 0,
    dessert: 0,
  });
  const [products, setProducts] = useState({
    combo: [],
    friedChicken: [],
    spicyChicken: [],
    spaghetti: [],
    burger: [],
    sideDish: [],
    dessert: [],
  });
  const [mounted, setMounted] = useState({
    combo: false,
    friedChicken: false,
    spicyChicken: false,
    spaghetti: false,
    burger: false,
    sideDish: false,
    dessert: false,
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
  const [products1, setProducts1] = useState({
    combo: [],
    friedChicken: [],
    spicyChicken: [],
    spaghetti: [],
    burger: [],
    sideDish: [],
    dessert: [],
  });
  const [loadMore1, setLoadMore1] = useState({
    combo: true,
    friedChicken: true,
    spicyChicken: true,
    spaghetti: true,
    burger: true,
    sideDish: true,
    dessert: true,
  });
  const [optionFetch, setOptionFetch] = useState({
    combo: { category: "combo", limit: 4 },
    friedChicken: { category: "friedChicken", limit: 4 },
    spicyChicken: { category: "spicyChicken", limit: 4 },
    spaghetti: { category: "spaghetti", limit: 4 },
    burger: { category: "burger", limit: 4 },
    sideDish: { category: "sideDish", limit: 4 },
    dessert: { category: "dessert", limit: 4 },
  });

  const goTo = (topOffset) => {
    window.scrollTo({
      top: topOffset,
      behavior: "smooth",
    });
  };

  // Fetch the subtotal of quantity of each category
  const fetchSubQuantity = async (category) => {
    const customQuery = query(
      productRef,
      orderByChild("category"),
      equalTo(category)
    );
    try {
      await get(customQuery).then((snapshots) => {
        if (snapshots?.exists() && !mounted[category]) {
          setSubTotal((prev) => {
            return {
              ...prev,
              [category]: Object.values(snapshots?.val())?.length,
            };
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    for (const key in subTotal) {
      fetchSubQuantity(key);
    }
  }, []);

  // Async fetch data from Firebase
  const fetchProduct = async (category, option) => {
    const customQuery = query(
      productRef,
      orderByChild("category"),
      equalTo(category)
    );
    setLoading((prev) => {
      return { ...prev, [category]: true };
    });
    try {
      await get(query(customQuery, limitToFirst(option.limit))).then(
        (snapshots) => {
          if (snapshots?.exists() && !mounted[category]) {
            setProducts1((prev) => {
              return { ...prev, [category]: Object.values(snapshots?.val()) };
            });
            setMounted((prev) => {
              return { ...prev, [category]: true };
            });
          }
        },
        (reason) => console.log(reason)
      );
      if (firstLoad) {
        const finishLoad = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 300);
        });
        finishLoad.then(() => {
          const element = document.getElementById(viewTo);
          const elementPosition = element?.getBoundingClientRect().top;
          // const offSet = elementPosition + window.pageYOffset - 140;
          const offSet = elementPosition + window.pageYOffset - 100;
          goTo(offSet);
          setFirstLoad(false);
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

  useEffect(() => {
    for (const key in subTotal) {
      if (products1[key].length < subTotal[key]) {
        setLoadMore1((prev) => {
          return { ...prev, [key]: true };
        });
      } else {
        setLoadMore1((prev) => {
          return { ...prev, [key]: false };
        });
      }
    }
  }, [products1]);

  // Async funtion fetch data from JSON Server
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
      if (firstLoad) {
        const finishLoad = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 500);
        });
        finishLoad.then(() => {
          const element = document.getElementById(viewTo);
          const elementPosition = element.getBoundingClientRect().top;
          const offSet = elementPosition + window.pageYOffset - 140;
          goTo(offSet);
          setFirstLoad(false);
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
    setOptionFetch((prev) => {
      return {
        ...prev,
        [category]: {
          ...prev[category],
          limit: prev[category].limit + 4,
        },
      };
    });
    setMounted((prev) => {
      return { ...prev, [category]: false };
    });
  };

  // Fetch Combo
  useEffect(() => {
    // fetchData("combo", optionFetch.combo);
    fetchProduct("combo", optionFetch.combo);
  }, [optionFetch.combo]);

  // Fetch friedChicken
  useEffect(() => {
    // fetchData("friedChicken", optionFetch.friedChicken);
    fetchProduct("friedChicken", optionFetch.friedChicken);
  }, [optionFetch.friedChicken]);

  // Fetch spicyChicken
  useEffect(() => {
    // fetchData("spicyChicken", optionFetch.spicyChicken);
    fetchProduct("spicyChicken", optionFetch.spicyChicken);
  }, [optionFetch.spicyChicken]);

  // Fetch Spaghetti
  useEffect(() => {
    // fetchData("spaghetti", optionFetch.spaghetti);
    fetchProduct("spaghetti", optionFetch.spaghetti);
  }, [optionFetch.spaghetti]);

  // Fetch Burger and Price
  useEffect(() => {
    // fetchData("burger", optionFetch.burger);
    fetchProduct("burger", optionFetch.burger);
  }, [optionFetch.burger]);

  // Fetch Side Dish
  useEffect(() => {
    // fetchData("sideDish", optionFetch.sideDish);
    fetchProduct("sideDish", optionFetch.sideDish);
  }, [optionFetch.sideDish]);

  // Fetch Dessert
  useEffect(() => {
    // fetchData("dessert", optionFetch.dessert);
    fetchProduct("dessert", optionFetch.dessert);
  }, [optionFetch.dessert]);

  return (
    <div className="menu-container art-text">
      <PageContainer className="container menu-container art-text">
        <div id="menu" className="menu">
          <Stack direction={"row"} justifyContent="space-between">
            <PageTitle title="Thực đơn" />
            <Stack direction={"row"} alignItems={"center"}>
              <Link to="/menu/search" className="menu-search">
                <BsSearch /> Tìm kiếm
              </Link>
            </Stack>
          </Stack>
          {/* Combo Category */}

          <MenuRow
            id={"combo"}
            title="Combo"
            loading={loading.combo}
            loadMore={loadMore1.combo}
            products={products1.combo}
            handleLoadMore={() => {
              handleLoadMore("combo");
            }}
          />
          {/* Fried Chicken Category */}
          <MenuRow
            id={"fried-chicken"}
            title="Gà Giòn Vui Vẻ"
            loading={loading.friedChicken}
            loadMore={loadMore1.friedChicken}
            products={products1.friedChicken}
            handleLoadMore={() => {
              handleLoadMore("friedChicken");
            }}
          />
          {/* Spicy Chicken Category */}
          <MenuRow
            id={"spicy-chicken"}
            title="Gà Sốt Cay"
            loading={loading.spicyChicken}
            loadMore={loadMore1.spicyChicken}
            products={products1.spicyChicken}
            handleLoadMore={() => {
              handleLoadMore("spicyChicken");
            }}
          />
          {/* Spaghetti Category */}
          <MenuRow
            id={"spaghetti"}
            title="Mỳ Ý Sốt Bò Bằm"
            loading={loading.spaghetti}
            loadMore={loadMore1.spaghetti}
            products={products1.spaghetti}
            handleLoadMore={() => {
              handleLoadMore("spaghetti");
            }}
          />
          {/* Burger Category */}
          <MenuRow
            id={"burger"}
            title="Burger & Cơm"
            loading={loading.burger}
            loadMore={loadMore1.burger}
            products={products1.burger}
            handleLoadMore={() => {
              handleLoadMore("burger");
            }}
          />
          {/* Side Dish Category */}
          <MenuRow
            id={"side-dish"}
            title="Phần Ăn Phụ"
            loading={loading.sideDish}
            loadMore={loadMore1.sideDish}
            products={products1.sideDish}
            handleLoadMore={() => {
              handleLoadMore("sideDish");
            }}
          />
          {/* Dessert Category */}
          <MenuRow
            id={"dessert"}
            title="Món Tráng Miệng"
            loading={loading.dessert}
            loadMore={loadMore1.dessert}
            products={products1.dessert}
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
