'use client'
import HomeAdmins from '@/app/componant/admin/adminhome';
import Navebar from '@/app/componant/navbar';
import DropdownComp from '@/app/componant/admin/dropdown';

const HomeAdmin = ()=>{
return (
    <>
    <Navebar/>
    <DropdownComp />
    <HomeAdmins/>
    </>
)

}

export default HomeAdmin;