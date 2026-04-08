import React from 'react'
import Container from './Container'
import FooterTop from './FooterTop'
import { Logo } from './Logo'
import SocialMedia from './SocialMedia'
import { global } from 'styled-jsx/css'
import { SubText, SubTitle } from './ui/text'
import { categoriesData, quickLinksData } from '@/constants/data'
import Link from 'next/link'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Footer = () => {
  return (
    <footer className='bg-white border-t '  >
      <Container>
        <FooterTop/>
        <div className='py-12 grid grid-cols-1 md:gird-cols-2 lg:grid-cols-4 gap-8 ' >
          <div className='space-y-4' >
            <Logo/>
            <SubText >Discover curated furniture collections at Shopcartyt, blending
              style and comfort to elevate your living spaces.</SubText>
              <SocialMedia 
              className='text-darkColor/60' 
              tooltipClassName='bg-darkColor text-white'
              iconClassName='border-darkColor/60 hover:border-shop_dark_green hover:text-shop_dark_green'
              />
          </div>
          <div>
            <SubTitle > Quick Links </SubTitle>
            <ul className='space-y-3 mt-4' >
              {quickLinksData.map((item) => (
                <li key={item?.title} >
                  <Link href={item?.href} 
                  className='hover:text-shop_light_green hoverEffect font-medium text-darkColor/60'
                  > {item?.title} </Link>
                </li>
              ) )}
            </ul>
          </div>
          <div>
            <SubTitle >Categories</SubTitle>
            <ul className='space-y-3 mt-4' >
              {categoriesData.map((item) => (
                <li key={item?.title} >
                  <Link href={`/category/${item?.href}`} 
                  className='hover:text-shop_light_green hoverEffect font-medium text-darkColor/60 '
                  > {item?.title} </Link>
                </li>
              ) )}
            </ul>
          </div>
          <div className='space-y-4' >
            <SubTitle> NewsLetter </SubTitle>
            <SubText> Subscribe to our newsletter </SubText>
            <form className='space-y-3' >
              <Input  placeholder='Enter your email...' type='email' required />
              <Button className='w-full' > Subscribe </Button>
            </form>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
