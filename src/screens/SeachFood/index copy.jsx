import { yupResolver } from "@hookform/resolvers/yup";
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
import { useForm } from "react-hook-form";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../apis/axiosClient";
import { productApi } from "../../apis/productApi";
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
  const { register, handleSubmit } = useForm();
  const [showSetting, setShowSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [limitLoad, setLimitLoad] = useState(8);
  const [order, setOrder] = useState("asc");
  const [searchPrice, setSearchPrice] = useState([0, 150000]);
  const [mounted, setMounted] = useState(false); // To control set product in async funtion <Promise>

  // Products get from firebase by query no limited
  const [productsTotal, setProductsTotal] = useState([]);
  // Products get from firebase by query - limited
  const [products, setProducts] = useState([]);
  // Products get from firebase by query - no limited & filtered
  const [productsFiltered, setProductsFiltered] = useState(products);

  // Products get from JSON server
  const productsState = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const settingQuery = (orderBy, valueLow, valueHigh) => {
    const foodQuery = query(
      productRef,
      orderByChild(orderBy), // sort array theo orderBy ascending
      startAt(valueLow), // range price min
      endAt(valueHigh) // range price max
    );
    return foodQuery;
  };

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
    // Bước 2.1: Lấy tổng sản phẩm theo điều kiện của Query (chưa Limit)
    const getProducts = async () => {
      await onValue(query(customQuery), (snapshots) => {
        const newList = [...snapshots.val()];
        setProductsTotal(newList || []); // Get total products follow query param
        const productLimited =
          order === "asc"
            ? newList.slice(0, limitLoad - 1)
            : newList.slice(-limitLoad); // Limit số lượng
        setProducts(productLimited);
        setProductsFiltered(productLimited);
      });

      // onValue(query(customQuery, limitToFirst(limitLoad)), (snapshots) => {
      //   setProducts([...snapshots.val()] || []); // Get Products limited
      // });
      // await get(query(customQuery)).then((snapshots) => {
      //   if (snapshots.exists() && !mounted) {
      //     setProductsTotal(Object.values(snapshots?.val())); //set products List theo keysearch - nolimit
      //     setTotal(Object.values(snapshots?.val())?.length); //set tổng số lượng
      //   }
      // });
    };

    // Bước 2.2: Lấy số lượng sản phẩm được limit theo state limitLoad
    // const getProducts = async (customQuery) => {
    //   await get(query(customQuery, limitToFirst(limitLoad))).then(
    //     (snapshots) => {
    //       // Kiểm tra nếu tồn tại data và data chưa được mount vào component thì setproducts(data.val())
    //       if (snapshots.exists() && !mounted) {
    //         setProducts(Object.values(snapshots.val()));
    //       }
    //     },
    //     (reason) => {
    //       console.log(reason);
    //     }
    //   );
    // };
    // Sau khi thay đổi customQuery và limitLoad, chờ 0.5s tự động active getTotal và getProduct, và set mount = true

    getProducts();
    // getProducts(customQuery);
    // setMounted(true);

    setIsLoading(false);
  }, [customQuery, limitLoad, order]);

  useEffect(() => {
    setProductsFiltered(productsTotal);
  }, [productsTotal]);

  // 2B. By JSON server --------------------------
  useEffect(() => {
    setIsLoading(true);
    // dispatch(fetchProduct(optionFetch));
    if (productsState.products.length < productsState.total) {
      setIsLoadMore(true);
    } else setIsLoadMore(false);
    setIsLoading(false);
  }, [optionFetch]);

  // console.log(optionFetch);
  // console.log(productsState.products);

  // Bước 3: Kiểm tra total > products.length ? loadmore = true : false
  useEffect(() => {
    // Kiểm tra khi dùng firebase
    if (products?.length >= productsTotal.length) {
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
    setMounted(false);
  };

  // Bước 5. Khi người dùng nhập key search, debounce 500s rồi fetch data
  const handleUpdateOption = (field, e) => {
    let filteredProducts = [];
    let newList = [...productsTotal];
    switch (field) {
      case "keySearch":
        // change e.target.value of keySearch in optionFetch Axios
        setOptionFetch((prev) => {
          return { ...prev, keySearch: e?.target?.value, limit: 8 };
        });
        // change e.target.value of keySearch in Firebase custom query
        const queryByText = query(
          productRef,
          orderByChild("description"),
          startAt(e?.target?.value.trim()?.toUpperCase()),
          endAt(e?.target?.value.trim()?.toUpperCase() + "\uf8ff")
        );
        setCustomQuery(queryByText);
        setMounted(false);
        break;
      case "category":
        // Change option fetch
        let list = [...optionFetch.category];
        if (e.target.checked) {
          // Option Axios
          list = [...list, e?.target?.value];
          setOptionFetch((prev) => {
            return {
              ...prev,
              limit: prev.limit,
              [field]: list,
            };
          });
        } else {
          // Option Axios
          list.splice(list.indexOf(e?.target?.value), 1);
        }
        setOptionFetch((prev) => {
          return {
            ...prev,
            limit: prev.limit,
            [field]: list,
          };
        });
        // Custom query / filter manual
        if (list?.length > 1) {
          list.forEach((category) => {
            filteredProducts = [
              ...filteredProducts,
              ...newList.filter((item) => item.category === category),
            ];
          });
          setProductsFiltered(filteredProducts);
        } else {
          // setProductsFiltered(filteredProducts);
        }
        break;
      case "order":
        // change Option axios fetch --------------------------
        setOptionFetch((prev) => {
          return { ...prev, limit: prev.limit, [field]: e?.target?.value };
        });
        setOrder(e?.target?.value);
        break;
      case "searchPrice":
        setOptionFetch((prev) => {
          return { ...prev, limit: prev.limit, [field]: e };
        });
        break;

      default:
        break;
    }
  };

  // Change the limit load to 8 when price range changed
  useEffect(() => {
    handleUpdateOption("searchPrice", searchPrice); // update optionFetch
    setLimitLoad(8);
    setMounted(false);
  }, [searchPrice]);

  // Update the custom query when change the limitLoad (follow the above useEffect)
  useEffect(() => {
    // setCustomQuery(settingQuery("price", searchPrice[0], searchPrice[1]));
    setMounted(false);
  }, [limitLoad]);

  const onHandleError = (errors) => {
    console.log(errors);
  };

  const handleChangeSlider = (e, newValue) => {
    setSearchPrice(newValue);
  };

  const onHandleSubmit = (data) => {
    const fetch = async () => {
      // dispatch(fetchProduct(optionFetch));
    };
    fetch();
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
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                  <div className="search-setting-item">
                    <h3>Tìm kiếm:</h3>
                    <DebounceInput
                      type="text"
                      id="search-key"
                      debounceTimeout={500}
                      placeholder="nhập tên món ăn ..."
                      onChange={(e) => {
                        handleUpdateOption("keySearch", e.target.value);
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
                                defaultChecked={item.value === "asc"}
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
                        <input
                          type="number"
                          className=""
                          value={searchPrice[0]}
                          max={150000}
                          step={1000}
                          onChange={(e) => {
                            setSearchPrice([
                              Number(e.target.value),
                              searchPrice[1],
                            ]);
                          }}
                        />
                        <input
                          type="number"
                          className=""
                          value={searchPrice[1]}
                          min={0}
                          step={1000}
                          onChange={(e) => {
                            setSearchPrice([
                              searchPrice[0],
                              Number(e.target.value),
                            ]);
                          }}
                        />
                      </Stack>
                    </div>
                  </Box>
                  <ArtBtn type="submit" content="Tìm kiếm" />
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
