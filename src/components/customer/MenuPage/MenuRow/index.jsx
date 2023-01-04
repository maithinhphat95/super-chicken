import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import ProductItem from "../../../common/ProductItem";

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
      <div className="menu-list-category-load">
        {loading && (
          <div className="menu-list-category-loading">
            <CircularProgress color="error" />
          </div>
        )}
        {loadMore && (
          <button
            className="menu-list-category-load-more nor-text"
            onClick={handleLoadMore}
          >
            + Load More +
          </button>
        )}
      </div>
    </div>
  );
}

export default MenuRow;
