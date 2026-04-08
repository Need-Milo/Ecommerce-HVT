import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products/productsSlice";
import usersReducer from "./users/usersSlice";
import cartsReducer from "./carts/cartsSlice";
import authReducer from "./auth/authSlice"
import ordersReducer from "./orders/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,        
    products: productsReducer,
    orders: ordersReducer,
    users: usersReducer,
    carts: cartsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
