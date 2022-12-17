import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import MenuItem from "../MenuItem";

function MenuRow(props) {
  const { title, loading, loadMore, products, handleLoadMore } = props;
  return (
    <div className="menu-list-category">
      <h3>{title}</h3>
      <Grid container spacing={1} className="menu-list">
        {products &&
          products.map((product, index) => (
            <MenuItem key={index} product={product} />
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
