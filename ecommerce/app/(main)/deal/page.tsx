"use client"

import Container from '@/components/Container'
import ProductsCard from '@/components/ProductsCard'
import { Title } from '@/components/ui/text'
import { useAppSelector } from '@/lib/redux/hooks'
import React from 'react'

const DealPage = () => {
  const { items } = useAppSelector((state) => state.products)

  return (
    <div className="py-10 bg-shop-light-bg min-h-[70vh]">
      <Container>
        <Title
          className="mb-6 underline underline-offset-4 decoration-1 text-base uppercase tracking-wide"
        >
          Hot Deals of the Week
        </Title>

        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-10">
            No deals available right now.
          </p>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4
            "
          >
            {items.map((product) => (
              <ProductsCard
                key={ product?.id}
                product={product}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default DealPage