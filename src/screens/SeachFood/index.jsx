import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Slider, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PageContainer from "../../components/common/PageContainer";
import PageCover from "../../components/common/PageCover";
import PageTitle from "../../components/common/PageTitle";
import Carousel from "../../components/customer/HomePage/Carousel";
import MenuItem from "../../components/common/ProductItem";
import { searchSchema } from "../../constant/schema";
import "./style.scss";
import CartContainer from "../../components/customer/MenuPage/CartContainer";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import ArtBtn from "../../components/common/ArtBtn";
import { useList } from "react-firebase-hooks/database";
import {
  endAt,
  limitToFirst,
  limitToLast,
  onValue,
  orderByChild,
  orderByValue,
  query,
  ref,
  startAt,
} from "firebase/database";
import { database } from "../../firebase/config";
const productSample = {
  category: "friedChicken",
  description: "2 MIẾNG GÀ GIÒN",
  id: "5",
  image: "https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png",
  name: "gà giòn vui vẻ 1",
  price: "60000",
};
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
    value: "ascending",
  },
  {
    name: "giá giảm dần",
    value: "descending",
  },
];

export default function SearchFood() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(searchSchema),
  });

  const [showSetting, setShowSetting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [searchPrice, setSearchPrice] = useState([0, 150000]);
  const [products, setProducts] = useState([]);
  const [optionFetch, setOptionFetch] = useState({
    keySearch: "",
    category: "",
    priceLow: "",
    PriceHigh: "",
  });

  const handleChangeSlider = (e, newValue) => {
    setSearchPrice(newValue);
  };
  const onHandleSubmit = (data) => {
    console.log(data);
  };
  const onHandleError = (errors) => {
    console.log(errors);
  };

  // Lọc theo giá và chọn ra limit n sản phẩm cao nhất/ thấp nhất
  const foodQuery = query(
    ref(database, "products"),
    orderByChild("price"),
    startAt(20000), // lọc theo giá thấp nhất
    endAt(100000), // lọc theo giá cao nhất
    limitToLast(8) // limit số lượng fetch có giá cao nhất
    // limitToFirst(8) // limit số lượng fetch có giá thấp nhất
  );

  // const keySearch = query(
  //   ref(database, "products"),
  //   orderByChild("description")
  //     .startAt(`%${"gà"}%`)
  //     .endAt("gà" + "\uf8ff")
  //     .once("value")
  // );

  onValue(
    foodQuery,
    (foods) => {
      // setProducts(foods.val());
      console.log(foods.val());
    },
    {
      onlyOnce: true,
    }
  );

  useEffect(() => {
    setValue("searchPrice", searchPrice);
  }, [searchPrice]);

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
                                defaultChecked
                                type="radio"
                                value={item.value}
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
                  Kết quả: <span>14</span> món ăn
                </div>
                <div className="search-result-list">
                  <Stack direction={"row"} flexWrap={"wrap"}>
                    <MenuItem product={productSample} />
                    <MenuItem product={productSample} />
                    <MenuItem product={productSample} />
                    <MenuItem product={productSample} />
                  </Stack>
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
