import axiosClient from "./axiosClient";
const USER_URL = `/users`;

export const userApis = {
  // get user information/ login
  get: async ({ id, email, password }) => {
    try {
      const response = await axiosClient.get(USER_URL, {
        params: {
          ...(id && { id: id }),
          ...(email && { email: email }),
          ...(password && { password: password }),
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // Register a user
  add: async () => {
    try {
      const response = await axiosClient.post(USER_URL);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // Update user's information
  update: async (id) => {
    try {
      const response = await axiosClient.patch(`${USER_URL}/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  // Delete user's account
  delete: async (id) => {
    try {
      const response = await axiosClient.delete(`${USER_URL}/${id}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
