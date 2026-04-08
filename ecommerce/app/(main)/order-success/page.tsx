"use client"

import PriceFormatter from '@/components/PriceFormatter'
import { useAppSelector } from '@/lib/redux/hooks'
import React from 'react'
import Link from 'next/link'

const OrderSuccess = () => {
  const order = useAppSelector((state) => state.orders.currentOrder)

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">No order found</p>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 md:p-10 space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-shop-dark-green ">
             Order Successful!
          </h1>
          <p className="text-sm text-gray-500">
            Thank you for your purchase.
          </p>
        </div>

        <div className="border rounded-lg divide-y text-sm md:text-base">

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">{order.id}</span>
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Total</span>
            <PriceFormatter amount={order.total} className="font-semibold text-lg" />
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Full Name</span>
            <span className="font-medium">{order.nameUser}</span>
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Phone</span>
            <span>{order.phone}</span>
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Address</span>
            <span className="text-right max-w-[60%] wrap-break-word">
              {order.address}
            </span>
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Status</span>
            <span className="capitalize text-yellow-600 font-medium">
              {order.status}
            </span>
          </div>

          <div className="flex justify-between p-4">
            <span className="text-gray-500">Date</span>
            <span>
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-center pt-4 flex justify-between ">
          <div>
          <Link
            href="/order-history"
            className="inline-block bg-shop-btn-dark-green text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
            History Order
          </Link>          
            </div>
          <div>
          <Link
            href="/"
            className="inline-block bg-shop-btn-dark-green text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            >
            Continue Shopping
          </Link>          
            </div>
            
        </div>
        

      </div>
    </div>
  )
}

export default OrderSuccess