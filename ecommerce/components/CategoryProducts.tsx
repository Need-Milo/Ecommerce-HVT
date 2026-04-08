"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { fetchProducts } from "@/lib/redux/products/productsThunk";
import ProductsCard from "./ProductsCard";

const CategoryProducts = () => {
  const { items, loading } = useAppSelector(
    (state) => state.products
  );

  const { id } = useParams(); 
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const filteredProducts = useMemo(() => {
    if (!id) return [];

    return items.filter(
      (product) =>
        product.type?.toLowerCase() === id.toString().toLowerCase()
    );
  }, [items, id]);

  const categories = [
    ...new Set(items.map((item) => item.type)),
  ];

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">

      <div className="flex flex-col md:min-w-40 border rounded-lg overflow-hidden">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() =>
              router.push(`/category/${category}`)
            }
            className={`bg-transparent border-0 p-2 rounded-none 
              text-darkColor shadow-none hover:bg-shop-orange
              hover:text-white font-semibold transition-colors
              border-b last:border-b-0 capitalize
              ${
                category === id
                  ? "bg-shop-orange text-white"
                  : ""
              }
            `}
          >
            <p className="w-full text-left">
              {category}
            </p>
          </Button>
        ))}
      </div>

      <div className="flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Product is loading...</span>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-500 py-10 text-center">
            No products found
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductsCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;