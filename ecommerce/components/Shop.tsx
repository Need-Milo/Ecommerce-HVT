"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import React, { useEffect, useState } from "react"
import Container from "./Container"
import { Title } from "./ui/text"
import CategoryList from "./shop/CategoryList"
import PriceList from "./shop/PriceList"
import { fetchProducts } from "@/lib/redux/products/productsThunk"
import ProductsCard from "./ProductsCard"
import Pagination from "./Pagination"

const Shop = () => {
  const [category, setCategory] = useState<string | null>(null)
  const [price, setPrice] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const { items, loading } = useAppSelector(
    (state) => state.products
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts())
    }
  }, [dispatch, items.length])

  useEffect(() => {
    setCurrentPage(1)
  }, [category, price])

  const parsePrice = (price: string | null) => {
    if (!price) return null
    const [min, max] = price.split("-").map(Number)
    return { min, max }
  }

  const priceRange = parsePrice(price)

  let filteredItems = items.filter((p) => {
    const matchCategory = category
      ? p.type?.toLowerCase() === category.toLowerCase()
      : true

    const matchPrice = priceRange && price !== "asc" && price !== "desc"
      ? p.price >= priceRange.min &&
        p.price <= priceRange.max
      : true

    return matchCategory && matchPrice
  })

  if (price === "asc") {
  filteredItems = [...filteredItems].sort(
    (a, b) => a.price - b.price
  );
}

if (price === "desc") {
  filteredItems = [...filteredItems].sort(
    (a, b) => b.price - a.price
  );
}

  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  )

  const startIndex = (currentPage - 1) * itemsPerPage

  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the products you need
            </Title>

            <button
              onClick={() => {
                setCategory(null)
                setPrice(null)
              }}
              className="text-shop-dark-green underline text-sm mt-2 font-medium hover:text-shop-orange"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop-dark-green/50">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop-btn-dark-green/50 scrollbar-hide">
            <CategoryList
              value={category}
              onChange={setCategory}
            />
            <PriceList
              value={price}
              onChange={setPrice}
            />
          </div>

          <div className="flex-1 pt-5">
            {loading && <p>Loading products...</p>}

            {!loading && (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 py-3">
                  {paginatedItems.map((u) => (
                    <ProductsCard
                      key={u.id}
                      product={u}
                    />
                  ))}
                </div>
                <div className="mb-10" >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  />
                  </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Shop