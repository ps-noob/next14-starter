import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/Footer";
import ClientSideServiceProvider from "@/components/clientSideProviderTest";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next App",
  description: "Next.js starter app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ClientSideServiceProvider> */}
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        {/* </ClientSideServiceProvider> */}
      </body>
    </html>
  );
}
