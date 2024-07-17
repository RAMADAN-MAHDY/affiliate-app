'use client'
import Link from 'next/link';
import {useState , useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux"; 
import { add } from '@/lib/conterSlice';
import ProductsCard from '@/app/componant/products'
const Products = () => {
    return (
       
        <ProductsCard/>
    );
};

export default Products;
