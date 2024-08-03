import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from './StoreProvider';
import {NextUIProvider} from "@nextui-org/react";
import GoogleAnalytics from '@/app/componant/GoogleAnalytics'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "EL MAHDY - تسويق الكتروني وأفليت",
    description: "EL MAHDY يقدم خدمات التسويق الالكتروني المتكاملة والتسويق بالعمولة. تعرف على استراتيجياتنا لتحسين ظهورك على الإنترنت.",
  };
  

export default function RootLayout({ children }) {
  return (
    <html lang="an" rel="rtl">
        <head>
        <meta name="keywords" content="افليت المهدي, EL MAHDY, تسويق الكتروني, تسويق بالعمولة, تحسين محركات البحث, استراتيجيات تسويق" />

        <link rel="icon" href="/WhatsApp Image 2024-07-11 at 21.01.51_df437c70.png" sizes="52x52" />

        <meta name="google-site-verification" content="-1HDfMA8r2MPfNp6oa5PTR1Pe2Z-g4CThr_hEn1rIsM" />

        </head>
      <body className={inter.className}>     

<GoogleAnalytics/>

      <StoreProvider>
      <NextUIProvider>
      {children}
      </NextUIProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
