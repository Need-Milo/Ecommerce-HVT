import Image from 'next/image';
import { Product } from '@/lib/redux/products/productsSlice';
import Link from 'next/link';
import { Flame, StarIcon } from 'lucide-react';
import AddToWishListButton from './AddToWishListButton';
import { Title } from './ui/text';
import { AddToCartButton } from './AddToCartButton';

interface Props {
  product: Product
}

const ProductsCard = ({product}:Props ) => {
  return (
    <div className='text-sm border border-dark_blue/20 rounded-md bg-white group' >
        <div className='relative group overflow-hidden bg-shop-light-bg  ' >
           <Link key={product.id} href={`/products/${product.id}`} >
            {product?.image && (
                <Image                 
                    src={product.image[0]}
                    alt={product.name}
                    loading='lazy'
                    width={300}
                    height={300}
                    unoptimized
                />
            )}
     
            {/* <div >          
                <img src={product.image} alt={product.name}/>
                 {product.name}-{product.price}
           </div> */}
            </Link>
            <AddToWishListButton product={product} />
            {product.status === "sale" && (
              <p className='absolute top-2 left-2 z-10 border
               border-darkColor/50 px-2 rounded-full
                group-hover:border-shop-light-green
                 group-hover:text-shop-light-green
                 hoverEffect ' >Sale!</p>
            )}
            {product?.status === "hot" && <Link  
              href={"/deal"}
              className='absolute top-2 left-2 z-10 border 
              border-shop-orange/50 p-1 rounded-full group-hover:border-shop-orange 
              hover:text-shop-dark-green hoverEffect'
            >   
              <Flame 
                size={18}
                fill='#fb6c08'
                className='text-shop-orange/50 group-hover:text-shop-orange hoverEffect'
              />
              </Link>}
              {product.status === "new" && (
              <p className='absolute top-2 left-2 z-10 border
               border-darkColor/50 px-2 rounded-full
                group-hover:border-shop-light-green
                 group-hover:text-shop-light-green
                 hoverEffect ' >New!</p>
            )}
            </div>       
            <div className='p-3' >
                {product?.category && (
                  <p className='uppercase line-clamp-1 text-xs text-shop_light-text ' > 
                    {product?.category} 
                  </p>
                )} 
                <Title className='text-sm line-clamp-1' >{product?.name}</Title>
                <div className=' flex items-center gap-2' >
                  <div className='flex items-center' >
                    {[...Array(5)].map((_,index) => (
                      <StarIcon 
                      size={13}
                      key={index} 
                      className={index < 4 ?"text-shop_light_green" : "text-shop_light-text"   } 
                      fill={index < 4 ? "#93D991"  : "#ababab" }
                      />
                    ) ) }
                  </div>
                  <p className='text-shop_light-text text-xs tracking-wide ' >5 Reviews </p>
                </div>
                <div className='flex items-center gap-2 tracking-wide ' >
                  <p className='font-semibold' >In Stock</p>
                  <p className='text-shop_light-text/80' > {product?.stock > 0 ? product.stock : "unavailable" } </p>
                </div>
                <div className='pb-2' >
                    <p className='font-semibold  ' >
                      ${product.price}
                    </p> 
                </div>
                <AddToCartButton product= {product} className='rounded-full' />
            </div>
    </div>
  )
} 

export default ProductsCard