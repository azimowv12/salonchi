import React, { useState } from 'react';
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GrFavorite } from "react-icons/gr";
import { IoCartOutline } from "react-icons/io5";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <div className='max-w-7xl mx-auto mt-8 relative'>
            <div className='hidden md:flex gap-10'>
                <div className='flex items-center gap-2'>
                    <img src="/logo.png" alt="" />
                    <h1 className=' text-[#EA580C] text-[24px] font-semibold leading-[100%] font-Rubik '>Salonchi</h1>
                </div>

                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className=" cursor-pointer flex gap-[10px] items-center bg-[#EA580C] rounded-[8px] w-[154px] h-[48px] pl-4 text-white"
                >
                    <FaBars className='text-[24px]' />
                    <button className='font-medium text-[16px] leading-[100%]'> Kategoriya </button>
                </div>

                <div className="flex">
                    <div className='relative'>
                        <input type="search" placeholder='Mahsulot izlash' className=' md:max-w-[430px] md:w-[382px] pl-[46px] text-[#667085] font-normal w-[475px] h-[48px] border border-[#E5E7EB] rounded-tl-lg rounded-bl-lg' />
                        <div className='absolute top-0 pt-3 pl-[14px]'>
                            <CiSearch className='text-[24px]' />
                        </div>
                    </div>
                    <button className='bg-[#EA580C] cursor-pointer w-[112px] h-[48px] rounded-tr-lg rounded-br-lg font-medium text-white'> Izlash</button>
                </div>

                <div className='ml-[65px] flex gap-10'>
                    <div className='flex flex-col justify-center items-center'>
                        <FaRegUser className='text-[24px]' />
                        <h1 className='text-[14px] font-normal'>Profil</h1>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <GrFavorite className='text-[24px]' />
                        <h1 className='text-[14px] font-normal'>Sevimlilar</h1>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <IoCartOutline className='text-[24px]' />
                        <h1 className='text-[14px] font-normal'>Savat</h1>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='absolute top-[70px] left-[190px] w-[250px] bg-white border shadow-lg rounded-lg p-4 z-50'>
                    <ul className='flex flex-col gap-3 text-[16px] text-[#374151]'>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Kreslo</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Kosmetologiya asboblari</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Mashinka</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Elektr ustara</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Trimmer</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Fen</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Epilyator</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Makiyaž</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Manikyur va pedikyur</li>
                        <li className='hover:text-[#EA580C] cursor-pointer'>Kushetka</li>
                    </ul>
                </div>
            )}

            <div className='px-6 flex flex-col gap-3 md:hidden'>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-2'>
                        <img src="/logo.png" alt="logo" className='w-[24px]' />
                        <h1 className='text-[#EA580C] text-[18px] font-semibold font-Rubik'>Salonchi</h1>
                    </div>
                    <div className='flex items-center gap-1 text-black text-[16px]'>
                        <select name="" id="">
                            <option value="">Uzbekcha</option>
                            <option value="">Ruscha</option>
                        </select>
                    </div>
                </div>
                <div className='relative mt-4'>
                    <input
                        type="search"
                        placeholder='Mahsulot izlash'
                        className='w-full h-[40px] pl-[36px] border border-[#E5E7EB] rounded-lg text-[#667085] text-[14px]'
                    />
                    <div className='absolute top-[8px] left-[10px]'>
                        <CiSearch className='text-[20px]' />
                    </div>
                </div>
            </div>
        </div>
    );
}
