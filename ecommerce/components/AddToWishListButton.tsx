import { Product } from '@/lib/redux/products/productsSlice'
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import React from 'react'

const AddToWishListButton = ({product,className} : { product: Product; className?:string; } ) => {
  return (
    <div className= {cn('absolute top-2 right-2 z-10 flex-items-center space-x-2', className)} >
        <button className='p-2.5 rounded-full hover:bg-shop-dark-green
         hover:text-white hoverEffect bg-white ' >
            <Heart size={15}/>
        </button>
    </div>
  )
}

export default AddToWishListButton