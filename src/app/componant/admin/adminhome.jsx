'use client'
import AddProdect from './addprodect';
import { useState } from "react";

const HomeAdmins = () => {

//  01097756090
    return (
             <section className='flex justify-center bg-[#0d00ff37] w-[100vw] h-full'>

              <div className="w-[300px] h-full">
                    <AddProdect />
                </div>

             </section>
            

       
    )
}

export default HomeAdmins;
