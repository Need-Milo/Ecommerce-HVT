import BodyServer from "@/components/BodyClient";
import Container from "@/components/Container";
import HeaderBanner from "@/components/HeaderBanner";
import HomeCategories from "@/components/HomeCategories";
import HeaderServer from "@/components/HeaderServer"
import LastestBlog from "@/components/LastestBlog";
import ShopByBrands from "@/components/ShopByBrands";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <Container  >
      <HeaderServer/>
      <HeaderBanner/>
      <div className="py-10">
      <BodyServer/>
      </div>
      <HomeCategories />
      <ShopByBrands/>
      <Footer/>
    </Container>
  );
}
