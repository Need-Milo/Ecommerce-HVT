"use client"

import { brands } from "@/constants/data"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function BrandsDetail() {
    const { id } = useParams()

    const brand = brands.find((p) => (
        p.id === Number(id)
    ))

    if (!brand) {
        return <div className="text-center mt-10">Brand not found</div>
    }

    return (
        <div className="w-full max-w-sm mx-auto mt-10">
            <Image
                src={brand.logo}
                alt="BrandsLogo"
                width={500}
                height={500}
                className="w-full h-auto object-contain"
                unoptimized
            />
        </div>
    )
}