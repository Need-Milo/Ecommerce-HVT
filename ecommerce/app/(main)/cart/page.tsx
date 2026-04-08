"use client"

import Container from '@/components/Container';
import NoAccess from '@/components/NoAccess';
import PriceFormatter from '@/components/PriceFormatter';
import QuantityButton from '@/components/QuantityButton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { CommandSeparator } from '@/components/ui/command';
import { Title } from '@/components/ui/text';
import { fetchCart, removeAllFromCart, removeFromCart } from '@/lib/redux/carts/cartsThunk';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { Separator } from '@radix-ui/react-separator';
import { ShoppingBag, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const CartPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  const cartItems = useAppSelector((state) => state.carts.items)
  const userId = user?.id || user?._id
  const router = useRouter()
  const dispatch = useAppDispatch()
  const subTotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0
    return total + price * item.quantity
  },0 )

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId))
    }
  }, [userId, dispatch])

  if (!userId) return <NoAccess />

  return (
    <Container>
      <div className='flex items-center gap-2 py-5'>
        <ShoppingBag className='text-darkColor' />
        <Title>Shopping Cart</Title>
      </div>

      <div className='grid lg:grid-cols-3 md:gap-8'>
        <div className='lg:col-span-2 rounded-lg '>
          <div className='border bg-white rounded-md'>
            {cartItems.map((item) => (
              <div key={item._id} className="border-b p-2.5 last:border-b-0 flex items-center justify-between">
                <div className='flex flex-1 items-start gap-2 h-26 md:h-44 '  >
                   {item.product?.image && (
                  <Link href={`/products/${item.product.id}`} 
                      className='border p-0.5 md:p-1 rounded-md overflow-hidden group'
                  >
                    <Image
                      src={item.product.image[0]}
                      alt={item.product.name}
                      width={500}
                      height={500}
                      loading='lazy'
                      unoptimized
                      className='w-32 md:w-40 h-32 md:h-40 object-cover 
                      group-hover:scale-105 hoverEffect'
                    />
                  </Link>
                )}
                <div className='h-full flex flex-1 flex-col justify-between py-1' >
                  <div className='flex flex-col gap-0.5 md:gap-1.5' >
                    <h2 className='text-base font-semibold line-clamp-1' >{item.product?.name}</h2>
                    <p className='text-sm capitalize' >Variant:{" "} <span className='font-semibold' >{item.product.type}</span>    </p>
                    <p className='text-sm capitalize' >
                      Status:{" "}
                      <span className='font-semibold' >{item.product.status}</span>
                    </p>
                  </div>  
                  <div>                        
                            <Trash onClick={() => {
                          dispatch(removeAllFromCart({
                            userId,
                            itemId:item.id
                            
                          }))
                          .unwrap()
                          .then(() => {
                            toast.success("Removed from cart")
                          })
                          .catch(() => {
                            toast.error("Failed to remove")
                          } )
                          
                        } }
                        className='w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect cursor-pointer'
                        
                        />                                        
                  </div>   
                </div>      
                </div>
                <div className='flex flex-col items-start justify-between h-36 md:h-44 p-0.5 md:p-1 '  >
                  <PriceFormatter amount={(item.product.price as number) *  (item?.quantity || 0) }
                    className='font-bold text-lg '
                  />
                  <QuantityButton userId={userId}
                                  itemId={item.id}
                                  productId={item.product.id}
                                  quantity={item.quantity}
                                  product={item.product}
                   />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='lg:col-span-1' >
          <div className='hidden md:inline-block w-full bg-white p-6 rounded-lg border' >
            <h2 className='text-xl font-semibold mb-4' > Order </h2>
              <div className='space-y-4'  >
                <div className='flex items-center justify-between' >
                    <span>SubTotal:</span>
                     <PriceFormatter amount={subTotal}  />
                </div>
                <div className='flex items-center justify-between' >
                    <span>Discount:</span>
                     <PriceFormatter amount={0}  />
                </div>
                
                <div className=' font-semibold text-lg flex items-center justify-between border-t pt-4 border-darkColor/50  ' >
                    <span>Total:</span>
                     <PriceFormatter amount={subTotal} className='text-lg font-bold text-black'  />
                </div>

              <Button
                onClick={() => {
                  if(cartItems.length === 0){
                    toast.error("Cart is empty")
                    return
                  }
                  router.push("/checkout")
                } }
              className='w-full rounded-full font-semibold tracking-wide hoverEffect' size="lg" >
                  Buy
              </Button>              
            </div>
          </div>
          

        </div>
        <div className='md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 ' >
          <div className='bg-white p-4 rounded-lg border mx-4' >
            <h2>Order</h2>
          </div>
        </div>

      </div>
    </Container>
  )
}

export default CartPage