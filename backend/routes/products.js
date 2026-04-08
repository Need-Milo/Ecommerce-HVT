import express from "express";
import { productsData } from "../data/products.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(productsData);
});

router.post("/", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  productsData.push(newProduct);
  res.json(newProduct);
});

router.delete("/:id", (req, res) => {
  const index = productsData.findIndex(p => p.id == req.params.id);
  productsData.splice(index, 1);
  res.json({ message: "Deleted" });
});

export default router;
