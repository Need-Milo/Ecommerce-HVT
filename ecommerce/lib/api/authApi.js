import api from "./axiosClient";

export const loginApi = (data) => api.post("/auth/login", data);
export const registerApi = (data) => api.post("/auth/register", data);
export const getMeApi = () => api.get("/auth/me");
export const logout = () => {
    return api.post("auth/logout")
}