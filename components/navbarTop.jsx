"use client";
import { HiOutlinePhone, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useDarkMode } from '../context/DarkModeContext'

export default function NavbarTop() {
    const { isDark, toggleDarkMode } = useDarkMode();

    return (
        <div className={`w-full ${isDark ? 'bg-gray-800' : 'bg-[#EA580C]'} md:block hidden`}>
            <div className='max-w-7xl mx-auto flex justify-between'>
                <div className={`flex gap-8 pt-[10px] pb-[10px] ${isDark ? 'text-gray-200' : 'text-white'} font-medium`}>
                    <h1>Yangiliklar</h1>
                    <h1>Hamkorlik qilish</h1>
                </div>

                <div className={`flex gap-8 pt-[10px] pb-[10px] ${isDark ? 'text-gray-200' : 'text-white'} font-medium`}>
                    <div className='flex gap-2 items-center'>
                        <HiOutlinePhone className='text-[18px] h-[18px]' />
                        <h2>+998 99 632 51 40</h2>
                    </div>

                    <button
                        onClick={toggleDarkMode}
                        className='flex items-center gap-2 hover:opacity-80 transition-opacity'
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? <HiOutlineSun className='text-[20px]' /> : <HiOutlineMoon className='text-[20px]' />}
                    </button>
                </div>
            </div>
        </div>
    );
}