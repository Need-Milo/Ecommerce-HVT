"use client";

import { StarIcon } from "lucide-react";
import Image from "next/image";
import ImageView from "../../../../components/ImageView";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import ConTainer from "../../../../components/Container";
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks";
import { fetchProducts } from "@/lib/redux/products/productsThunk";
import { AddToCartButton } from "../../../../components/AddToCartButton";
import FavoriteButton from "../../../../components/FavoriteButton";
import Link from "next/link";

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params?.id);

  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const product = items.find((p) => p.id === id);

  if (loading || !product) {
    return (
      <ConTainer className="py-20 text-center">
        <p className="text-gray-500">Loading product...</p>
      </ConTainer>
    );
  }

  const isStock = product.stock > 0;

  // 🔥 Lọc sản phẩm cùng type
  const relatedProducts = items.filter(
    (p) => p.type === product.type && p.id !== product.id
  );

  return (
    <>
      <ConTainer className="flex flex-col md:flex-row gap-10 py-10">
        {product.image?.length > 0 && (
          <ImageView images={product.image} isStock={isStock} />
        )}

        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600 tracking-wide">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={14}
                className="text-shop-light-green"
                fill="#3b9c3c"
              />
            ))}
            <p className="font-semibold">(120)</p>
          </div>

          <div className="space-y-3 border-y border-gray-200 py-5">
            <p className="text-2xl font-bold">${product.price}</p>

            <span
              className={`px-4 py-1.5 text-sm font-semibold rounded-lg inline-block ${
                isStock
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {isStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full">
              <AddToCartButton product={product} />
            </div>
            <FavoriteButton showProduct={true} product={product} />
          </div>
        </div>
      </ConTainer>

      {relatedProducts.length > 0 && (
        
        <ConTainer className="pb-16">
          <h3 className="text-xl font-bold mb-6">
            Related Products
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0,6).map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="border rounded-lg p-3 hover:shadow-md transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-contain group-hover:opacity-0 transition duration-300"
                  />

                  {item.image[1] && (
                    <Image
                      src={item.image[1]}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-contain opacity-0 group-hover:opacity-100 transition duration-300"
                    />
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <p className="font-semibold text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-shop-dark-green font-bold">
                    ${item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </ConTainer>
      )}
    </>
  );
}