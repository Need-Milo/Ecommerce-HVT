import api from "./axiosClient";

export const getProductsApi = () => api.get("/products");
export const addProductApi = (data) => api.post("/products", data);
export const deleteProductApi = (id) => api.delete(`/products/${id}`);
