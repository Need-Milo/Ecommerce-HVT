
import React from 'react';
import Container from './Container';
import { Logo } from './Logo';
import { HeaderMenu } from './HeaderMenu';
import { SearchBar } from './SearchBar';
import CartIcon from './CartIcon';
import FavoriteButton from './FavoriteButton';
import MobileMenu from './MobileMenu';
import { useAppSelector } from '@/lib/redux/hooks';
import LogoutClient from './LogoutClient';
import SignInClient from './SignInClient';
import { LogInIcon } from 'lucide-react';
import Link from 'next/link';
import LogInClient from './LogInClient';

const Header = async () => {


  return (
    <header className="bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md ">
      
      <Container className="flex items-center justify-between">
        <MobileMenu />
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start text-lightColor md:gap-0">
          <Logo />
        </div>

        <HeaderMenu />

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
           <SignInClient/>
           <LogInClient/>
        </div>
      </Container>
    </header>
  );
};

export default Header;
