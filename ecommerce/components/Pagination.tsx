"use client"

import React from "react"

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      
      {Array.from({ length: totalPages }).map(
        (_, index) => {
          const page = index + 1
          const isActive = page === currentPage

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md border transition
                ${
                  isActive
                    ? "bg-shop-dark-green text-white border-shop-dark-green"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {page}
            </button>
          )
        }
      )}

      
    </div>
  )
}

export default Pagination