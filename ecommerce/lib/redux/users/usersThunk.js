import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsersApi, createUserApi, deleteUserApi } from "../../api/usersApi";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await getUsersApi();
  return res.data;
});

export const addUser = createAsyncThunk("users/create", async (user) => {
  const res = await createUserApi(user);
  return res.data;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await deleteUserApi(id);
  return id;
});
