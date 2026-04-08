"use client"

import PriceFormatter from '@/components/PriceFormatter'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { fetchOrders } from '@/lib/redux/orders/ordersThunk'
import React, { useEffect } from 'react'

const OrderHistory = () => {
    const user = useAppSelector((state) => state.auth.user )
    const order = useAppSelector((state) => state.orders.orders )
    const loading = useAppSelector((state) => state.orders.loading )
    const dispatch = useAppDispatch();
    const userId = user?.id || user?._id

    useEffect(() => {
        if(userId){
            dispatch(fetchOrders(userId))
        }
    },[userId,dispatch] )

    if(loading) return <p>Loading...</p>
    if(!order.length) return <p>No orders Found</p>
 
  return (
    <div className='px-4 md:px-10 lg:px-20 mb-10 '>
        <h2 className='text-center font-semibold text-2xl md:text-3xl my-4 text-shop-dark-green'>
            Order history
        </h2>
        <div>
            {order.slice(0,1).map((u) => (
                <div key={u.id} >
                <h1 className='text-2xl font-semibold' >User Info:</h1>
                <p>Name:{u.nameUser}</p>
                <p>Phone: {u.phone}</p>
                <p>Address: {u.address}</p>
                </div>
            ) )}
        </div>

        <ul className='border rounded overflow-hidden'>

            <li className='hidden md:grid grid-cols-7 border-b text-center font-bold py-3 bg-gray-100'>
                <span>Order</span>
                <span>ID</span>           
                <span>Phone</span>
                <span>Address</span>
                <span>Status</span>
                <span>Date</span>
                <span>Total</span>
            </li>

            {order.map((u,index) => (
                <li 
                  key={u.id} 
                  className='
                    border-b p-4
                    flex flex-col gap-2
                    md:grid md:grid-cols-7 md:text-center md:items-center md:gap-0
                  '
                >

                    <div className='md:hidden space-y-1 text-sm'>
                        <p><strong>Order:</strong> {index + 1}</p>
                        <p><strong>ID:</strong> {u.id}</p>
                        <p><strong>Phone:</strong> {u.phone}</p>
                        <p><strong>Address:</strong> {u.address}</p>
                        <p><strong>Status:</strong> {u.status}</p>
                        <p><strong>Date:</strong> {new Date(u.createdAt).toLocaleString()}</p>
                        <p><strong>Total:</strong> <PriceFormatter amount={u.total} /></p>
                    </div>

                    <span className='hidden md:block'>{index + 1}</span>
                    <span className='hidden md:block break-all'>{u.id}</span>
                    <span className='hidden md:block'>{u.phone}</span>
                    <span className='hidden md:block wrap-break-word'>{u.address}</span>
                    <span className='hidden md:block'>{u.status}</span>
                    <span className='hidden md:block'>{new Date(u.createdAt).toLocaleString()}</span>
                    <span className='hidden md:block'>
                        <PriceFormatter amount={u.total} />
                    </span>

                </li>
            ))}
        </ul>     
    </div>
  )
}

export default OrderHistory