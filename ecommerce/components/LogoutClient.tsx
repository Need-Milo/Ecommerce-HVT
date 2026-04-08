"use client"

import { logout } from '@/lib/api/authApi';
import { clearAuth } from '@/lib/redux/auth/authSlice';
import { clearCart } from '@/lib/redux/carts/cartsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React from 'react'
import { route } from 'sanity/router';

const LogoutClient = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const {user} = useAppSelector((state)=> state.auth )
    const handleLogout =  async() => {
       try{
         await logout();
         
      } catch(e) {} 
      dispatch(clearAuth())
      dispatch(clearCart())
        router.push("/login");
       router.refresh();
    }

    if(user) 

  return (
    <>
      
      <button onClick={handleLogout} > <LogOut className='w-6 h-10'  /> </button>
    </>
  )
}

export default LogoutClient