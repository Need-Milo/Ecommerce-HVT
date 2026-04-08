import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMeApi, loginApi, registerApi } from "../../api/authApi";

export const loginThunk = createAsyncThunk<
  { user: any; token: string },
  { email: string; password: string }
>(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, password });
      return {
         user: res.data.user, 
       token: res.data.token};
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

export const registerThunk = createAsyncThunk<
  { user: any; token: string, message: string },
  { name: string; email: string; password: string }
>(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await registerApi({ name, email, password });
      return { user: res.data.user , token: res.data.token, message: res.data.message };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Register failed"
      );
    }
  }
);

export const getMeThunk = createAsyncThunk<{
  user: any; token: string
}>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeApi();
      return { user: res.data.user, token: res.data.token };
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);
