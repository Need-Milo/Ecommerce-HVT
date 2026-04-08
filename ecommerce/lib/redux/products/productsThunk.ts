import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductsApi,
  addProductApi,
  deleteProductApi,
} from "../../api/productsAPi";
import type { Product } from "./productsSlice";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetch",
  async () => {
    const res = await getProductsApi();
    return res.data;
  }
);

export const createProduct = createAsyncThunk<Product, Product>(
  "products/create",
  async (product) => {
    const res = await addProductApi(product);
    return res.data;
  }
);

export const removeProduct = createAsyncThunk<number, number>(
  "products/remove",
  async (id) => {
    await deleteProductApi(id);
    return id;
  }
);
