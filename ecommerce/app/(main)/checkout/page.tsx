"use client"

import PriceFormatter from '@/components/PriceFormatter';
import { Button } from '@/components/ui/button';
import { clearCart } from '@/lib/redux/carts/cartsSlice';
import { fetchCart } from '@/lib/redux/carts/cartsThunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { createOrder } from '@/lib/redux/orders/ordersThunk';
import { fetchProducts } from '@/lib/redux/products/productsThunk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const CheckOutPage = () => {
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [nameUser, setNameUser] = useState("")
  const user = useAppSelector((state) => state.auth.user)
  const router = useRouter()
  const userId = user?.id || user?._id
  const cartItems = useAppSelector((state) => state.carts.items)
  const dispatch = useAppDispatch()

  const subTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0
    return total + price * item.quantity
  }, 0)

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId))
    }
  }, [userId, dispatch])

  const handleOrder = async () => {
    if (!userId) {
      toast.error("Please login")
      return
    }

    if (!address.trim()) {
      toast.error("Please enter address")
      return
    }
    if (!nameUser.trim()) {
    toast.error("Please enter full name")
    return
    }

    if (!phone.trim()) {
    toast.error("Please enter phone")
    return
    }

    try {
      await dispatch(createOrder({ userId, address, phone, nameUser })).unwrap()
      dispatch(clearCart())
      await dispatch(fetchProducts())
      toast.success("Order success")
      router.push("/order-success")
    } catch {
      toast.error("Order failed")
    }
  }

  return (
  <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">

    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleOrder()
      }}
      className="p-6 md:p-8 space-y-4 border rounded-md shadow-md bg-white"
    >
      <h1 className="text-xl font-bold text-center">Checkout</h1>

        <div className='text-center' >

      <PriceFormatter
        amount={subTotal}
        className="font-bold text-2xl text-primary  "
        />
        </div>
        <input
        className="w-full border p-2 rounded"
        value={nameUser}
        onChange={(e) => setNameUser(e.target.value)}
        placeholder="Full Name"
        type="text"
        required
      />

      <input
        className="w-full border p-2 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone number"
        type="tel"
        required
        pattern="^0[0-9]{9}$"
      />

      <input
        className="w-full border p-2 rounded"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter delivery address"
        type="text"
        required
      />

      <Button type="submit" className="w-full">
        Confirm Order
      </Button>
    </form>

    <div className="border rounded-md p-4 space-y-4 bg-gray-50 shadow-sm">
      <h2 className="font-semibold text-lg">Order Summary</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 flex-1">
            {item.product?.image && (
              <div className="w-10 h-10 relative rounded overflow-hidden border">
                <Image
                  src={item.product.image[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="flex flex-col text-sm">
              <span className="font-medium line-clamp-1">
                {item.product?.name}
              </span>
              <span className="text-gray-500">
                x {item.quantity}
              </span>
            </div>
          </div>

          <PriceFormatter
            amount={(item.product?.price || 0) * item.quantity}
            className="font-medium text-sm"
          />
        </div>
      ))}

      <div className="border-t pt-3 flex justify-between font-semibold">
        <span>Total</span>
        <PriceFormatter amount={subTotal } className='text-xl'  />
      </div>
    </div>

  </div>
)
}

export default CheckOutPage