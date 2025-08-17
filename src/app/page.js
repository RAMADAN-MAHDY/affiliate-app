import { Amiri, Alkalami } from 'next/font/google';
// import dynamic from 'next/dynamic';
import ProductList from './componant/getAllProduct';           // all products 
import Navebar from "@/app/componant/navbar";
import CarouselFadeExample from '@/app/componant/carousel';
import ProductsCard from '@/app/componant/products';
import ChatBotWidget from '@/app/componant/ChatBot'

// const Navebar = dynamic(() => import("@/app/componant/navbar"), { ssr: false });
// const CarouselFadeExample = dynamic(() => import('@/app/componant/carousel'), { ssr: false });
// const ProductsCard = dynamic(() => import('@/app/componant/products'), { ssr: false });
// const ProductList = dynamic(() => import('./componant/getAllProduct'), { ssr: false });            // all products 


const amiri = Amiri({ 
  weight: ['400'],
  subsets: ['arabic'],
});

export default function Home() {
  return (
    <main className="flex flex-col items-center m-3 sm:m-0 w-full min-h-screen bg-[#fafafa]">
      <Navebar para="home" />

      <img
        src='/WhatsApp Image 2024-07-11 at 21.01.51_df437c70.png'
        alt="logo"
        className='w-[100px] h-[100px] mt-[-70px] sm:hidden z-5 mr-[-260px]'
      />

      <h1 className={`text-[#000000] mb-3 text-[24px] p-3 pb-2 rounded-3xl bg-[#a1a10e4c] shadow-[0_35px_35px_rgba(3,3,3,1.25)] ${amiri.className} relative z-10 sm:mt-[0px] mt-[-90px]`}>
        بسم الله الرحمن الرحيم
      </h1>

      <div className="w-full ml-0 z-0">
        <CarouselFadeExample />
      </div>
      <div className="w-full ml-[-50px] sm:hidden">
        <ProductsCard />
      </div>

      <div className="w-full mt-8">
        <ProductList />
      </div>

 <div className="w-full hidden sm:block">
        <ProductsCard />
      </div>
               <ChatBotWidget />

    </main>
  );
}

