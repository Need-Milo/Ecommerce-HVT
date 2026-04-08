"use client"

import { Product } from "@/lib/redux/products/productsSlice"
import React from "react"
import toast from "react-hot-toast"
import { Button } from "./ui/button"
import { ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import PriceFormatter from "./PriceFormatter"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addToCart } from "@/lib/redux/carts/cartsThunk"
import QuantityButton from "./QuantityButton"

interface Props {
  product: Product
  className?: string
}

export const AddToCartButton = ({ product, className }: Props) => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.auth.user)
  const cartItems = useAppSelector((state) => state.carts.items)

  const cartItem = cartItems.find(
    (i) => i.productId === product.id
  )

  const userId = user?.id || user?._id
  const isOutOfStock = product.stock === 0

  const handleAddToCart = () => {
    if (!userId) {
      toast.error("Please login to add to cart")
      return
    }

    if (isOutOfStock) {
      toast.error("Product is out of stock")
      return
    }

    dispatch(
      addToCart({
        userId,
        item: {
          productId: product.id,
          quantity: 1,
        },
      })
    )

    const shortName =
      product.name.length > 15
        ? product.name.substring(0, 15) + "..."
        : product.name

    toast.success(`${shortName} added successfully!`)
  }

  return (
    <div>
      {userId && cartItem ? (
        <div className="text-sm w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs text-darkColor/80">
              Quantity
            </span>

            <QuantityButton
              product={product}
              itemId={cartItem.id}
              userId={userId}
              productId={product.id}
              quantity={cartItem.quantity || 0}
            />
          </div>

          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">
              Subtotal
            </span>

            <PriceFormatter
              amount={product.price * (cartItem.quantity || 0)}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-shop-dark-green/80 text-shop-light-bg shadow-none border border-shop-dark-green/80 font-semibold tracking-wide hover:text-white hover:bg-shop-dark-green hover:border-shop-dark-green transition",
            isOutOfStock &&
              "opacity-50 cursor-not-allowed hover:bg-shop-dark-green/80",
            className
          )}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  )
}