import { Box, Grid, Slider, Stack } from "@mui/material";
import {
  endAt,
  get,
  limitToFirst,
  off,
  onValue,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ArtBtn from "../../components/common/ArtBtn";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import MenuItem from "../../components/common/ProductItem";
import ProductLoading from "../../components/common/ProductLoading";
import Carousel from "../../components/customer/HomePage/Carousel";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
import { database } from "../../firebase/config";
import { fetchProduct } from "../../redux/features/ProductSlice/productSlice";
import "./style.scss";

const foodCategory = [
  {
    name: "combo",
    value: "combo",
  },
  {
    name: "gà giòn vui vẻ",
    value: "friedChicken",
  },
  {
    name: "gà sốt cay",
    value: "spicyChicken",
  },
  {
    name: "mỳ ý sốt bò bằm",
    value: "spaghetti",
  },
  {
    name: "burger & cơm",
    value: "burger",
  },
  {
    name: "phần ăn phụ",
    value: "sideDish",
  },
  {
    name: "món tráng miệng",
    value: "dessert",
  },
];

const foodSort = [
  {
    name: "mặc định",
    value: "auto",
  },
  {
    name: "giá tăng dần",
    value: "asc",
  },
  {
    name: "giá giảm dần",
    value: "desc",
  },
];
const productRef = ref(database, "products");

export default function SearchFood() {
  const [showSetting, setShowSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);

  const [limitLoad, setLimitLoad] = useState(8);
  const [categories, setCategories] = useState([]);
  const [order, setOrder] = useState("auto");
  const [searchPrice, setSearchPrice] = useState([0, 150000]);

  // Products get from firebase by query no limited
  const [productsTotal, setProductsTotal] = useState([]);
  // Products get from firebase by query - no limited & filtered
  const [productsFiltered, setProductsFiltered] = useState(productsTotal);
  // Products get from firebase by query - limited
  const [products, setProducts] = useState([]);

  // Products get from JSON server
  const productsState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Bước 1: set State mặc định cho customQuery để fetch data bằng firebase / set optionFectch ban đầu cho JSON server
  const [customQuery, setCustomQuery] = useState(query(productRef));
  const [optionFetch, setOptionFetch] = useState({
    category: [],
    limit: 8,
    keySearch: "",
    searchPrice: [0, 150000],
    sortBy: "price",
    order: "asc",
  });

  // Bước 2: fetch data theo customQuery
  // 2A. By firebase realtime
  useEffect(() => {
    setIsLoading(true);
    // Bước 2.1: Lấy tổng sản phẩm theo điều kiện của Query
    onValue(query(customQuery), (snapshots) => {
      if (snapshots.exists()) {
        const newList = [...snapshots?.val()] || [
          ...Object.values(snapshots?.val()),
        ];
        setProductsTotal([...newList]); // Get total products follow query param
        setProductsFiltered([...newList]);
      }
    });
    setIsLoading(false);
  }, [customQuery]);

  console.log(productsTotal);

  useEffect(() => {
    let list = [...productsFiltered];
    const sortedList =
      order === "asc"
        ? list.sort((a, b) => {
            return Number(a.price) - Number(b.price);
          })
        : order === "desc"
        ? list.sort((a, b) => {
            return Number(b.price) - Number(a.price);
          })
        : productsFiltered;
    const productLimited = sortedList.slice(0, limitLoad);
    setProducts(productLimited);
    setIsLoading(false);
  }, [limitLoad, order, productsFiltered]);

  // 2B. By JSON server --------------------------
  // Bật lại sau khi chạy server
  // useEffect(() => {
  //   setIsLoading(true);
  //   dispatch(fetchProduct(optionFetch));
  //   if (productsState.products.length < productsState.total) {
  //     setIsLoadMore(true);
  //   } else setIsLoadMore(false);
  //   setIsLoading(false);
  // }, [optionFetch]);

  // Bước 3: Kiểm tra total > products.length ? loadmore = true : false
  useEffect(() => {
    // Kiểm tra khi dùng firebase
    if (products?.length >= productsFiltered.length) {
      // Kiểm tra khi dùng JSON server
      // if (productsState.products.length >= productsState.total ) {
      setIsLoadMore(false);
    } else {
      setIsLoadMore(true);
    }
  }, [productsTotal, products]);

  // Bước 4: Khi user nhấn nút load more, set loading = true, limitload += 8, mount = false
  const handleLoadMore = () => {
    setIsLoading(true);
    setLimitLoad((pre) => (pre += 8)); //limit load of firebase query
    setOptionFetch((prev) => {
      return { ...prev, limit: prev.limit + 8 }; // Limit load of JSON server
    });
  };

  // Bước 5. Khi người dùng nhập key search, debounce 500s rồi fetch data
  const handleUpdateOption = (field, e) => {
    switch (field) {
      case "keySearch": // OK
        // change e.target.value of keySearch in Firebase custom query
        if (e?.target?.value?.trim()?.length > 0) {
          const queryByText = query(
            productRef,
            orderByChild("description"),
            startAt(e?.target?.value.trim()?.toUpperCase()),
            endAt(e?.target?.value.trim()?.toUpperCase() + "\uf8ff")
          );
          setCustomQuery(queryByText);
        }

        // change e.target.value of keySearch in optionFetch Axios
        setOptionFetch((prev) => {
          return { ...prev, keySearch: e?.target?.value, limit: 8 };
        });
        break;

      case "category":
        let categoryList = [...optionFetch.category];
        if (e?.target?.checked) {
          categoryList = [...categoryList, e?.target?.value];
        } else {
          categoryList.splice(categoryList.indexOf(e?.target?.value), 1);
        }
        setOptionFetch((prev) => {
          return {
            ...prev,
            limit: prev.limit,
            [field]: categoryList,
          };
        });
        // Firebase
        setCategories([...categoryList]);
        break;

      case "order": // OK
        if (e?.target?.value !== "order") {
          // change Option axios fetch --------------------------
          setOptionFetch((prev) => {
            return { ...prev, limit: prev.limit, [field]: e?.target?.value };
          });
          // Change order for query
          setOrder(e?.target?.value);
          setLimitLoad(8);
        }
        break;

      case "searchPrice":
        // Change option fetch axios
        setOptionFetch((prev) => {
          return { ...prev, limit: prev.limit, [field]: e };
        });
        // Manual filter by price Firebase
        setSearchPrice(e);
        break;

      default:
        break;
    }
  };
  // Filter manual
  useEffect(() => {
    let categoryFilter = [];
    let newList = [...productsTotal];
    // Filter by category
    if (categories?.length > 0) {
      categories.forEach((category) => {
        categoryFilter = [
          ...categoryFilter,
          ...newList.filter((item) => item.category === category),
        ];
      });
    } else {
      categoryFilter = newList;
    }
    // Filter by price range
    let priceFilter = categoryFilter?.filter(
      (product) =>
        product.price >= searchPrice[0] && product.price <= searchPrice[1]
    );
    setProductsFiltered(priceFilter);
    setLimitLoad(8);
  }, [categories, productsTotal, searchPrice]);

  const handleChangeSlider = (e, newValue) => {
    setSearchPrice(newValue);
  };

  return (
    <PageCover className="search-page">
      <Carousel />
      <PageContainer className="search-container container">
        <PageTitle title="Tìm kiếm" />
        <div className="search-page-content">
          <Grid container spacing={1} className="search">
            <Grid item xs={12} lg={3}>
              <div className="search-setting">
                <form>
                  <div className="search-setting-item">
                    <h3>Tìm kiếm:</h3>
                    <DebounceInput
                      type="text"
                      id="search-key"
                      debounceTimeout={500}
                      placeholder="nhập từ khóa để tìm kiếm ..."
                      onChange={(e) => {
                        handleUpdateOption("keySearch", e);
                      }}
                    />
                  </div>
                  <Box
                    className="search-setting-toggle"
                    sx={{
                      display: { xs: "block", lg: "none" },
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setShowSetting((pre) => !pre);
                      }}
                    >
                      {!showSetting ? (
                        <>
                          <BsChevronDoubleDown /> Mở rộng
                        </>
                      ) : (
                        <>
                          <BsChevronDoubleUp /> Thu gọn
                        </>
                      )}
                    </button>
                  </Box>
                  <Box
                    sx={{
                      display: {
                        xs: showSetting ? "block" : "none",
                        lg: "block",
                      },
                    }}
                    className="search-setting-extent"
                  >
                    <Box className="search-setting-item">
                      <h3>Danh mục:</h3>
                      <Grid container spacing={0.5}>
                        {foodCategory.map((item, index) => (
                          <Grid item xs={6} md={3} lg={12} key={index}>
                            <label>
                              <input
                                name="search-category"
                                type="checkbox"
                                value={item.value}
                                onClick={(e) => {
                                  handleUpdateOption("category", e);
                                }}
                              />{" "}
                              {item.name.toLocaleString()}
                            </label>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <Box className="search-setting-item">
                      <h3>Sắp xếp:</h3>
                      <Grid container spacing={0.5}>
                        {foodSort.map((item, index) => (
                          <Grid item xs={6} md={3} lg={12} key={index}>
                            <label>
                              <input
                                name="search-sort"
                                defaultChecked={item.value === "auto"}
                                type="radio"
                                value={item.value}
                                onChange={(e) => {
                                  handleUpdateOption("order", e);
                                }}
                              />{" "}
                              {item.name}
                            </label>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <div className="search-setting-item ">
                      <h3>Giá tiền:</h3>
                      <Slider
                        size={"small"}
                        color="warning"
                        defaultValue={[0, 150000]}
                        min={0}
                        max={150000}
                        step={1000}
                        value={searchPrice}
                        valueLabelDisplay="auto"
                        sx={{ maxWidth: "400px" }}
                        onChange={handleChangeSlider}
                      />
                      <Stack
                        justifyContent={"space-between"}
                        direction={"row"}
                        className="search-setting-item-price"
                      >
                        <DebounceInput
                          type="number"
                          className=""
                          debounceTimeout={1000}
                          value={searchPrice[0]}
                          max={150000}
                          step={1000}
                          onChange={(e) => {
                            if (e.target.value >= 0) {
                              if (e.target.value < searchPrice[1]) {
                                setSearchPrice([
                                  Number(e.target.value),
                                  searchPrice[1],
                                ]);
                              } else {
                                setSearchPrice([
                                  searchPrice[1],
                                  searchPrice[1],
                                ]);
                              }
                            } else {
                              setSearchPrice([0, searchPrice[1]]);
                            }
                          }}
                        />
                        <DebounceInput
                          type="number"
                          className=""
                          debounceTimeout={1000}
                          forceNotifyOnBlur={true}
                          value={searchPrice[1]}
                          min={0}
                          step={1000}
                          onChange={(e) => {
                            if (e.target.value === "") {
                              return;
                            }
                            if (e?.target?.value >= 150000) {
                              setSearchPrice([searchPrice[0], 150000]);
                            } else {
                              if (e.target.value > searchPrice[0]) {
                                setSearchPrice([
                                  searchPrice[0],
                                  Number(e.target.value),
                                ]);
                              } else {
                                setSearchPrice([
                                  searchPrice[0],
                                  searchPrice[0],
                                ]);
                              }
                            }
                          }}
                        />
                      </Stack>
                    </div>
                  </Box>
                  {/* <ArtBtn type="submit" content="Tìm kiếm" /> */}
                </form>
              </div>
            </Grid>
            <Grid item xs={12} lg={9}>
              <div className="search-result">
                <div className="search-result-total">
                  Kết quả: <span>{productsTotal?.length || 0}</span> món ăn
                </div>
                <div className="search-result-list">
                  <Grid container spacing={1}>
                    {/* {productsState?.products &&
                      productsState?.products?.map((item, index) => (
                        <MenuItem key={index} product={item} />
                      ))} */}
                    {products &&
                      products?.map((item, index) => (
                        <MenuItem key={index} product={item} />
                      ))}
                  </Grid>
                  <ProductLoading
                    loading={isLoading}
                    loadMore={isLoadMore}
                    handleLoadMore={handleLoadMore}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <CartContainer />
      </PageContainer>
    </PageCover>
  );
}
