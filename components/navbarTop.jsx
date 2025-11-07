import React from 'react'
import { HiOutlinePhone } from "react-icons/hi";

export default function NavbarTop() {
    return (
        <div className=' w-full bg-[#EA580C] md:block hidden'>
            <div className='max-w-7xl mx-auto flex justify-between'>
                <div className='flex gap-8 pt-[10px] pb-[10px] text-white font-medium '>
                    <h1>Yangiliklar</h1>
                    <h1>Hamkorlik qilish</h1>
                </div>

                <div className=' flex gap-8 pt-[10px] pb-[10px] text-white font-medium'>
                    <div className='flex gap-2 items-center'>
                        
                       <HiOutlinePhone className='text-[18px] h-[18px]' />
                       <h2>+998 99 632 51 40</h2>
                    </div>
                    <div className="font-medium border-none outline-none ">
                        <select name="" id="">
                            <option className='text-black ' value="">O’zbekcha</option>
                            <option className='text-black' value="">Ruscha</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    )
}
