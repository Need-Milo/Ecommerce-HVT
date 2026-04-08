import { Poppins } from "next/font/google";
import Providers from "./providers";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import "./globals.css";
import AuthBootsTrap from "@/components/AuthBootsTrap";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: {
    template: "%s - ShopCart",
    default: "ShopCart",
  },
  description: "ShopCart online store, Your one stop shop for all your needs",
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
 {
  return (
    <html lang="en">
  <body
    className={`antialiased ${poppins.variable}`}
    suppressHydrationWarning
  >
    <Providers>
      <div className=" flex flex-col min-h-screen" >
        <Toaster position="bottom-right" />
        <AuthBootsTrap/>
      {children}
      </div>
      </Providers>
  </body>
</html>
  );
}
