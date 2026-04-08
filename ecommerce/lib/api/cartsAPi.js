import api from "./axiosClient";

export const getCartApi = (userId) => api.get(`/carts/${userId}`);
export const addCartApi = (userId, data) => api.post(`/carts/${userId}`, data);
export const removeCartApi = (userId, itemId) =>
  api.delete(`/carts/${userId}/${itemId}`);
export const removeAllCartApi = (userId, itemId) =>
  api.delete(`/carts/${userId}/${itemId}/remove-all`);