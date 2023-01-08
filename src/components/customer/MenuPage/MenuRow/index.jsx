import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import ProductItem from "../../../common/ProductItem";
import ProductLoading from "../../../common/ProductLoading";

function MenuRow(props) {
  const { title, loading, loadMore, products, handleLoadMore, id } = props;
  return (
    <div className="menu-list-category" id={id}>
      <h3>{title}</h3>
      <Grid container spacing={1} className="menu-list">
        {products &&
          products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
      </Grid>
      <ProductLoading
        loading={loading}
        loadMore={loadMore}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
}

export default MenuRow;
