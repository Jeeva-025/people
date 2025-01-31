"use client"
import React from 'react'
import { TiContacts } from "react-icons/ti";
import { GrGroup } from "react-icons/gr";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState } from 'react';
import Invite from "../../components/Invite.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWorkfastStore from "../../store.js";


const layout = ({children}) => {
    

  const { isInviteOpen, setIsInviteOpen } = useWorkfastStore();
 
  
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
    <div className='flex justify-center items-stretch p-1  max-h-screen '>
    <div className='flex flex-col justify-between bg-gray-800 rounded-tl-lg rounded-bl-lg max-h-screen min-w-[200px] py-3  space-y-3 border border-gray-600 '>
              <div>
                <h1 className='border-b border-gray-600 pl-3 '>People</h1>
                
                <div className='flex flex-col space-y-2'>
                <Link href="/people" className={`w-full py-1 ${pathname==='/people'?'border border-transparent rounded-lg mx-1  bg-yellow-300 bg-opacity-20  text-yellow-400 ':'text-white'}`}>
                    <div className='flex flex-row space-x-2 justify-start items-center'>
                      <TiContacts size={24}/>
                      <p className='text-xs'>All People</p>
                    </div>
                    </Link>
                    <Link href="/people/invite" className={`w-full py-1 ${pathname==='/people/invite'?'border border-transparent rounded-lg mx-1  bg-yellow-300 bg-opacity-20  text-yellow-400 ':'text-white px-1'}`}>
                    <div className='flex flex-row space-x-2 justify-start items-center'>
                      <GrGroup size={24}/>
                      <p className='text-xs'>Invited People</p>
                      </div>
                      </Link>
                    
                </div>
                </div>

                <div onClick={()=>setIsInviteOpen(true)} className='border bg-yellow-500 border-yellow-500 flex flex-row justify-center items-center space-x-2 py-2 rounded-lg mx-2'>
                    <AiOutlineUsergroupAdd className='text-black'/>
                    <button className='text-xs font-semibold text-black'>Invite People</button>
                </div>
    
            </div>
            <div className='flex-grow overflow-y-auto  scrollbar-custom mr-1 '>
                {children}
            </div>

    </div>

     {isInviteOpen && ( 
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <Invite  />
      </div>
     )}
    </>
  )
}

export default layout;