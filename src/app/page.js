
import { Amiri, Alkalami } from 'next/font/google';
import dynamic from 'next/dynamic';

const CarouselFadeExample = dynamic(() => import('@/app/componant/carousel'), { ssr: false });

// const ProductList = dynamic(() => import('./componant/getAllProduct'), { ssr: false });            // all products 

const ProductsCard = dynamic(() => import('@/app/componant/products'), { ssr: false });

const Navebar = dynamic(() => import("@/app/componant/navbar"), { ssr: false });

// Fetchdata();


const amiri = Amiri({
  weight: ['400'],
  subsets: ['arabic'],
});

export default function Home() {




  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Navebar para= "home" />

      <h1 className={`text-[#000000] mb-3 text-[24px] p-3 pb-2 rounded-3xl bg-[#a1a10e4c] shadow-[0_35px_35px_rgba(3,3,3,1.25)] ${amiri.className} relative z-10 sm:mt-[0px] mt-[-70px]`}>
        بسم الله الرحمن الرحيم
      </h1>

      <div className="w-full mt-[-137px] sm:mt-[-68px] z-0 "> 
        <CarouselFadeExample />
      </div>
      {/* <ProductList/> */}
      <ProductsCard/>

    </main>
  );
}
