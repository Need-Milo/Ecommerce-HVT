"use client"
import CategoryProducts from '@/components/CategoryProducts'
import Container from '@/components/Container'
import { Title } from '@/components/ui/text'
import { useAppSelector } from '@/lib/redux/hooks'
import { useParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
    const {items} = useAppSelector((state) => state.products )
    const {id} = useParams()
  return (
    <div className='py-10' >
        <Container>
            <Title>
            Product by Category: {" "}
            <span className='font-bold text-green-600 capitalize' >
                {id}
            </span>
             </Title>
             <CategoryProducts />
        </Container>
    </div>
  )
}

export default CategoryPage