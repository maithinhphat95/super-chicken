import axiosClient, { BASE_URL } from "./axiosClient";

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
    const PRODUCT_URL = `${BASE_URL}/products`;
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
      console.log("Get Products Success~ !");
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
