"use client"
import { getMeThunk } from '@/lib/redux/auth/authThunk'
import { clearCart } from '@/lib/redux/carts/cartsSlice'
import { fetchCart } from '@/lib/redux/carts/cartsThunk'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import React, { useEffect } from 'react'

const AuthBootsTrap = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)
    useEffect(() => {
        dispatch(getMeThunk())
    } ,[dispatch])
    useEffect(() => {
        if(user?.id || user?._id ){
            dispatch(fetchCart(user.id || user._id ))
        }else{
            dispatch(clearCart())
        }
    },[dispatch, user] )

  return null
}

export default AuthBootsTrap