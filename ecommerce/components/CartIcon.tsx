"use client"
import { useAppSelector } from '@/lib/redux/hooks'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CartIcon = () => {
  const {items} = useAppSelector((state) => state.carts )
  const total = items.reduce((sum, item) => sum + item.quantity,0 )
  return (
    <Link href={"/cart"} className="group relative">
        <ShoppingBag className="w-5 h-5 
      hover:text-shop-light-green hoverEffect " />
      <span className="absolute -top-1 -right-1 bg-shop-dark-green
       text-white h-3.5 w-3.5 rounded-full 
       text-xs font-semibold flex items-center justify-center" >{total}</span>
    </Link>
  )
}

export default CartIcon