import axiosClient from "./axiosClient";
const ORDER_URL = "/orders";

export const orderApis = {
  // Get all order list
  getAll: async () => {
    try {
      const response = await axiosClient.get(ORDER_URL);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getOrder: async (id, userId, limit, sortBy, orderBy) => {
    try {
      const response = await axiosClient.get(ORDER_URL, {
        params: {
          ...(id && { id: id }),
          ...(userId && { userId: userId }),
          ...(limit && { _limit: limit }),
          ...(sortBy && { _sort: sortBy }),
          ...(orderBy && { _order: orderBy || "asc" }),
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // Add a new order
  add: async (data) => {
    try {
      const response = await axiosClient.post(ORDER_URL, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  // Update by id
  edit: async (id, data) => {
    try {
      const response = await axiosClient.patch(`${ORDER_URL}/${id}`, data);
      return response;
    } catch (error) {
      console.log(error);
      alert("Cannot connect to API.");
    }
  },
  // Delete a order
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`${ORDER_URL}/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
