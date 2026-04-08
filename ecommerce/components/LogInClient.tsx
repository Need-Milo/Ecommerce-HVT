"use client"

import { useAppSelector } from '@/lib/redux/hooks'
import React from 'react'
import LogoutClient from './LogoutClient'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

const LogInClient = () => {
    const { user } = useAppSelector((state) => state.auth)
  return (
    <>
    {user ? (
      <LogoutClient/>
    ): (
      <Link href="/login" >
                <LogInIcon/>
           </Link>
    ) }
    </>
  )
}

export default LogInClient