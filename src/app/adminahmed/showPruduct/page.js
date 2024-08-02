"use client"
import Navebar from '@/app/componant/navbar';
import DropdownComp from '@/app/componant/admin/dropdown';
import ProductsCardAdmin from '@/app/componant/admin/showBroduct';
import EditForm from '@/app/componant/admin/amendment';
import { useState } from 'react';


const showPruduct = ()=>{

const [produbt_id , setProductId] = useState();
const [categoryId , setcurrentCategory] = useState();
const [showEditForm , setshowEditForm] = useState(false);
const [reloadEditForm , setReloadEditForm] = useState(false);





    // get currentCategory  and product Id from ProductsCardAdmin 

    const fetchProductsFromAPI = ( currentCategory  , id) => {
        console.log(currentCategory) 
        console.log(id)
        setProductId(id)
        setcurrentCategory(currentCategory)
        setshowEditForm(!showEditForm)
         };





return(<main className="flex min-h-screen flex-col items-center w-full">

<Navebar/>
<DropdownComp />

<ProductsCardAdmin reloadEditForm={reloadEditForm} fetchProductsFromAPI={fetchProductsFromAPI}/>
<EditForm productId={produbt_id} reloadEditForm={reloadEditForm} setReloadEditForm={setReloadEditForm} categoryId={categoryId} showEditForm={showEditForm}/>
</main>


)

}

export default showPruduct ;