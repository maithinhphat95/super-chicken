import { CircularProgress } from "@mui/material";
import React from "react";
import "./style.scss";
export default function ProductLoading(props) {
  const { loading, loadMore, handleLoadMore } = props;
  return (
    <div className="product-load">
      {loading && (
        <div className="product-load-loading">
          <CircularProgress color="error" />
        </div>
      )}
      {loadMore && (
        <button
          className="product-loady-loadmore nor-text"
          onClick={handleLoadMore}
        >
          + Load More +
        </button>
      )}
    </div>
  );
}
