import axiosClient from "./axiosClient";
const PRODUCT_URL = `/products`;

export const productApi = {
  // fetch all products
  getData: async ({
    id,
    category,
    limit,
    keySearch,
    rangePrice,
    sortBy,
    order,
  }) => {
    try {
      const response = await axiosClient.get(PRODUCT_URL, {
        params: {
          ...(id && { id: id }),
          ...(category && { category: category }),
          ...(limit && { _limit: limit }),
          ...(keySearch && { q: keySearch }),
          ...(rangePrice && {
            price_lte: rangePrice.lte,
            price_gte: rangePrice.gte,
          }),
          ...(sortBy && { _sort: sortBy }),
          ...(order && { _order: order || "asc" }),
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // Get all products data
  getAll: async () => {
    try {
      const response = await axiosClient.get("/products");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
