'use client'
import { Amiri, Alkalami } from 'next/font/google';
import dynamic from 'next/dynamic';
import Navebar from "@/app/componant/navbar";
import ProductsCard from '@/app/componant/products';
import { useState, useEffect } from 'react';
import ProductList from './componant/getAllProduct';

const CarouselFadeExample = dynamic(() => import('@/app/componant/carousel'), { ssr: false });

const amiri = Amiri({
  weight: ['400'],
  subsets: ['arabic'],
});

export default function Home() {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Navebar />

      <h1 className={`text-[#ffffff] mb-3 text-[24px] p-3 pb-2 rounded-3xl bg-[#a1a10e4c] shadow-[0_35px_35px_rgba(3,3,3,1.25)] ${amiri.className} relative z-10 sm:mt-[0px] mt-[-70px]`}>
        بسم الله الرحمن الرحيم
      </h1>

      <div className="w-full mt-[-137px] sm:mt-[-68px] z-0 h-full"> 
        <CarouselFadeExample />
      </div>
      <ProductList/>
      <ProductsCard/>

    </main>
  );
}
