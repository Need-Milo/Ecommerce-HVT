import express from "express"
import { cartsData } from "../data/carts.js"
import { productsData } from "../data/products.js"
const router = express.Router()

let ordersData = {}

router.get("/:userId", (req, res) => {
  const { userId } = req.params

  const userOrders = ordersData[userId] || []

  res.json(userOrders)
})

router.post("/:userId", (req, res) => {
  const { userId } = req.params
  const { address, phone, nameUser } = req.body

  const cart = cartsData[userId]

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" })
  }

  if (!address) return res.status(400).json({ message: "Address required" })
  if (!phone) return res.status(400).json({ message: "Phone required" })
  if (!nameUser) return res.status(400).json({ message: "Name required" })

  for (const item of cart) {
    const product = productsData.find(p => p.id == item.productId)

    if (!product || product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product?.name}`
      })
    }
  }
  cart.forEach(item => {
    const product = productsData.find(p => p.id == item.productId)
    if (!product) {
    throw new Error("Product not found")
  }

  if (product.stock < item.quantity) {
    throw new Error(`Not enough stock for ${product.name}`)
  }

  product.stock -= item.quantity
})

  const total = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  const newOrder = {
    id: Date.now(),
    userId,
    items: cart,
    total,
    nameUser,
    phone,
    address,
    status: "paid", 
    createdAt: new Date()
  }

  if (!ordersData[userId]) ordersData[userId] = []
  ordersData[userId].push(newOrder)

  cartsData[userId] = []

  res.json(newOrder)
})

export default router