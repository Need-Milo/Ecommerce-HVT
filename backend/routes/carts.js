import express from "express";
import { cartsData } from "../data/carts.js";
import { productsData } from "../data/products.js";
const router = express.Router();

router.get("/:userId", (req, res) => {
   const cart = cartsData[req.params.userId] || []

  const fullCart = cart.map(item => {
    const product = productsData.find(p => p.id == item.productId)
    return {
      ...item,
      product
    }
  })

  res.json(fullCart)
});
router.post("/:userId", (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!cartsData[userId]) cartsData[userId] = [];

  const cart = cartsData[userId];
  const existing = cart.find(i => i.productId == productId);

  if (existing) {
    existing.quantity += quantity;

    const product = productsData.find(p => p.id == productId);

    return res.json({
      ...existing,
      product
    });
  }

  const product = productsData.find(p => p.id == productId);

  const newItem = {
    id: Date.now(),
    productId,
    quantity,
    product
  };

  cart.push(newItem);

  res.json(newItem);
});
router.delete("/:userId/:itemId", (req, res) => {
  const { userId, itemId } = req.params;
  const cart = cartsData[userId];
  if(!cart) return res.status(404).json();

  const item = cart.find(i => i.id == itemId)
  if(!item) return res.status(404).json()

  if(item.quantity > 1  ){
    item.quantity -= 1
    return res.json(item)
  }
    
  cartsData[userId] = cart.filter(i => i.id != itemId);

  res.json({ id: Number (itemId), quantity: 0 });
});

router.delete("/:userId/:itemId/remove-all", (req, res) => {
  const { userId, itemId } = req.params;
  const cart = cartsData[userId];
  if (!cart) return res.status(404).json();

  cartsData[userId] = cart.filter(i => i.id != itemId);

  res.json({ itemId: Number(itemId) });
});




export default router;
