import React from 'react'
import { Title } from './ui/text'
import Link from 'next/link'
import { brands } from '@/constants/data'
import Image from 'next/image'
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react'

const extraData = [
    {
        title: "Free Delivery",
        description: "Free shipping over $100",
        icon: <Truck size={45} />
     },{
        title: "Free Return",
        description: "Free shipping over $100",
        icon: <GitCompareArrows size={45} />
     },{
        title: "Customer Support",
        description: "Friendly 27/7 customer support",
        icon: <Headset size={45} />
     },,{
        title: "Money Back guarantee",
        description: "Quality checked by our team",
        icon: <ShieldCheck size={45} />
     }

]

const ShopByBrands = () => {
  return (
    <div className='mb-10 lg:pb-20 bg-shop-light-bg p-5 lg:p-7 rounded-md ' >
        <div className='flex items-center gap-5 justify-between mb-10'    >
            <Title className='text-2xl' > Shop by Brands </Title>
            <Link href={"/shop"} className='text-sm font-semibold tracking-wide hover:text-shop-btn-dark-green hoverEffect '> View all </Link>

        </div>
        <div className='grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2.5 ' >
            {brands.map((brand) => (
                <div key={brand.id} >               
                     <Link href={`/brands/${brand.id}`} className='bg-white w-36 h-24 flex items-center
                      justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop-dark-green/20 hoverEffect ' >
                     <Image        
                        src= {brand.logo}
                        alt = "BrandLogo"
                        width={250}
                        height={250}
                        unoptimized
                        className='w-32 h-20 object-contain'
                        />
                        </Link>
                    </div>
            
            ) )}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop-light-green/20 py-5 ' >
            {extraData.map((item, index) => (
                <div key={index} className='flex items-center gap-3 group text-lightColor hover:text-shop-light-green'  >
                    <span className='inline-flex scale-100 group-hover:scale-90 hoverEffect' > {item?.icon} </span>
                    <div className='text-sm' >
                        <p className='text-darkColor/80 font-bold capitalize ' >{item?.title}</p>
                        <p className='text-lightColor' >{item?.description}</p>
                    </div>
                </div>
            ) )}
        </div>
    </div>
  )
}

export default ShopByBrands