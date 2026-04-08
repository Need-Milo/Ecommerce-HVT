import api from "./axiosClient"

export const createOrderApi = (userId: string, address: string, phone: string, nameUser: string ) =>
  api.post(`/orders/${userId}`, { address, phone, nameUser })
export const fetchOrderApi = (userId: string) => api.get(`/orders/${userId}`)