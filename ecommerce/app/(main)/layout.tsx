import HeaderServer from "../../components/HeaderServer"
import Footer from "../../components/Footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderServer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}