import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from './StoreProvider';
import {NextUIProvider} from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EL MAHDY",
  description: "للتسويق الالكتروني",
};

export default function RootLayout({ children }) {
  return (
    <html lang="an" rel="rtl">
      <body className={inter.className}>     
      <StoreProvider>
      <NextUIProvider>
      {children}
      </NextUIProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
