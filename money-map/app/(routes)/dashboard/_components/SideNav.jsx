"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LayoutGrid, Link as LinkIcon, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';


function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budget',
            icon:PiggyBank,
            path:'/dashboard/budget'
        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:'Upgrade',
            icon:ShieldCheck,
            path:'/dashboard/upgrade'
        }

    ];
    const path = usePathname();
    const [clientPath, setClientPath] = useState('');

    useEffect(()=>{
        setClientPath(path);
        
    },[path]);
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Image src={'/logo.svg'}
        alt='logo'
        width={160}
        height={160}
         />
         <div className='mt-5'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path} key={menu.id} className='block'>
                <h2  className={`flex gap-2 items-center
                 text-gray-500 font-bold
                 mb-2
                  p-5 cursor-pointer rounded-md
                  hover:text-primary hover:bg-blue-100 
                  ${path==menu.path&&'text-primary bg-blue-100'}
                  `}>
                   <span><menu.icon/></span> 
                    {menu.name}
                </h2>
                </Link>
            ))}
         </div>
         <div className='fixed bottom-10 p-5 flex gap-2 items-center  text-gray-500 font-bold '>
            <UserButton/>
            Profile
         </div>
    </div>
  )
}

export default SideNav;