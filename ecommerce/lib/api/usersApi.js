import api from "./axiosClient";

export const getUsersApi = () => api.get("/users");
export const createUserApi = (user) => api.post("/users", user);
export const deleteUserApi = (id) => api.delete(`/users/${id}`);
