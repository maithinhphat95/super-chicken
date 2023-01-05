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
import { useList } from "react-firebase-hooks/database";
import { useForm } from "react-hook-form";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import ArtBtn from "../../components/common/ArtBtn";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import MenuItem from "../../components/common/ProductItem";
import ProductLoading from "../../components/common/ProductLoading";
import Carousel from "../../components/customer/HomePage/Carousel";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
import { searchSchema } from "../../constant/schema";
import { database } from "../../firebase/config";
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
    value: "default",
  },
  {
    name: "giá tăng dần",
    value: "asc",
  },
  {
    name: "giá giảm dần",
    value: "des",
  },
];
const productRef = ref(database, "products");

export default function SearchFood() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(searchSchema),
    defaultValues: {
      keySearch: "",
      searchCategory: "",
      searchPrice: [0, 150000],
      searchSort: "asc",
    },
  });
  const [showSetting, setShowSetting] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [limitLoad, setLimitLoad] = useState(8);
  const [searchPrice, setSearchPrice] = useState([0, 150000]);
  const [mounted, setMounted] = useState(false); // To control set product in async funtion <Promise>
  const [products, setProducts] = useState([]);
  console.log(products);

  const settingQuery = (orderBy, valueLow, valueHigh, limit) => {
    const foodQuery = query(
      productRef,
      orderByChild(orderBy), // sort array theo orderBy ascending
      startAt(valueLow), // range price min
      endAt(valueHigh), // range price max
      limitToFirst(limit) // litmit số lượng ở đầu array
    );
    return foodQuery;
  };

  const initQuery = settingQuery(
    "price",
    searchPrice[0],
    searchPrice[1],
    limitLoad
  );

  const testQuery = query(
    productRef,
    orderByChild("description"),
    startAt("1 MIẾNG"),
    endAt("1 MIẾNG" + "\uf8ff")
    // limitToFirst(8)
  );

  const [customQuery, setCustomQuery] = useState(initQuery);

  // Handle Load More
  const handleLoadMore = () => {
    console.log("set Limit ++");
    setLimitLoad((pre) => (pre += 8));
    setMounted(false);
  };

  // Handle Submit Search
  const onHandleSubmit = (data) => {
    console.log(data);
    const queryByText = query(
      productRef,
      orderByChild("description"),
      startAt(data.keySearch),
      endAt(data.keySearch + "\uf8ff"),
      limitToFirst(8)
    );
    setCustomQuery(queryByText);
  };

  const onHandleError = (errors) => {
    console.log(errors);
  };

  const handleChangeSlider = (e, newValue) => {
    setSearchPrice(newValue);
  };

  // Change the limit load to 8 when price range changed
  useEffect(() => {
    setValue("searchPrice", searchPrice);
    setLimitLoad(8);
    setMounted(false);
  }, [searchPrice]);

  // Update the custom query when change the limitLoad (follow the above useEffect)
  useEffect(() => {
    setCustomQuery(
      settingQuery("price", searchPrice[0], searchPrice[1], limitLoad)
    );
    setMounted(false);
  }, [limitLoad]);

  // Dùng get( query ).then() get data 1 lần / nếu dùng với useState thì bị render nhiều lần, cần phải thêm 1 state để control (mounted)
  // Get product by customquery
  useEffect(() => {
    // Get total of product can be get
    const getTotal = async () => {
      await get(
        settingQuery("price", searchPrice[0], searchPrice[1], 1000)
      ).then((snapshots) => {
        if (snapshots.exists() && !mounted) setTotal(snapshots?.val()?.length);
      });
    };

    // Get products limited
    const getProduct = async (query) => {
      await get(query).then(
        (data) => {
          if (data.exists() && !mounted) {
            setProducts(Object.values(data.val()));
          }
        },
        (reason) => {
          console.log(reason);
        }
      );
    };

    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });

    console.log("get products");
    myPromise.then(() => {
      getTotal();
      getProduct(customQuery);
      setMounted(true);
    });
  }, [customQuery]);

  console.log(total);

  return (
    <PageCover className="search-page">
      <Carousel />
      <PageContainer className="search-container container">
        <PageTitle title="Tìm kiếm" />
        <div className="search-page-content">
          <Grid container spacing={1} className="search">
            <Grid item xs={12} lg={3}>
              <div className="search-setting">
                <form onSubmit={handleSubmit(onHandleSubmit, onHandleError)}>
                  <div className="search-setting-item">
                    <h3>Tìm kiếm:</h3>
                    <input
                      type="text"
                      id="search-key"
                      placeholder="nhập tên món ăn ..."
                      {...register("keySearch")}
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
                                {...register("searchCategory")}
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
                                {...register("searchSort")}
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
                  Kết quả: <span>{total}</span> món ăn
                </div>
                <div className="search-result-list">
                  <Grid container spacing={1}>
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
