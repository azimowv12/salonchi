"use client"
import React, { useState } from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { CgMail } from "react-icons/cg";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { FaTelegram, FaTiktok, FaYoutube } from "react-icons/fa";
import { useDarkMode } from '@/context/DarkModeContext';
import { IoGlobeOutline } from "react-icons/io5";

export default function Footer() {
    const { isDark } = useDarkMode();
    const [language, setLanguage] = useState('Uzbek');

    return (
        <footer className={`mt-[94px] ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <div className='max-w-7xl mx-auto px-4'>
                {/* Desktop Footer */}
                <div className='hidden md:block'>
                    <div className='flex justify-between py-12'>
                        {/* Logo and Copyright */}
                        <div className='max-w-[250px]'>
                            <div className='flex gap-2 items-center'>
                                <img 
                                    src="/logo.png" 
                                    alt="Salonchi logo" 
                                    className='w-8 h-8'
                                />
                                <h1 className={`text-[#EA580C] text-[24px] font-semibold leading-[100%] font-Rubik`}>
                                    Salonchi
                                </h1>
                            </div>
                            <p className={`text-[16px] leading-[100%] font-normal mt-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                2024 Barcha huquqlar himoyalangan
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h1 className={`text-[18px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Ma'lumotlar
                            </h1>
                            <div className='flex gap-3 mt-6'>
                                <CiLocationOn className='text-[#EA580C] text-[20px] flex-shrink-0 mt-1' />
                                <p className={`text-[16px] ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-[250px] font-normal leading-[140%]`}>
                                    4140 Parker Rd. Allentown, New Mexico
                                </p>
                            </div>
                            <div className='flex gap-3 mt-4'>
                                <CgMail className='text-[#EA580C] text-[20px] flex-shrink-0 mt-1' />
                                <p className={`text-[16px] ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-[250px] font-normal leading-[140%]`}>
                                    nathan.roberts@example.com
                                </p>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="">
                            <h1 className={`text-[18px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Takliflar
                            </h1>
                            <div className='mt-6 flex flex-col gap-4 text-[16px] font-normal leading-[100%]'>
                                <a 
                                    href='/about' 
                                    className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                                >
                                    Biz haqimizda
                                </a>
                                <a 
                                    href='/news' 
                                    className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                                >
                                    Yangiliklar
                                </a>
                                <a 
                                    href='/partnership' 
                                    className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                                >
                                    Hamkorlik
                                </a>
                                <a 
                                    href='/help' 
                                    className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
                                >
                                    Yordam
                                </a>
                            </div>
                        </div>

                        {/* Contact and Social */}
                        <div className="max-w-[280px]">
                            <h1 className={`text-[18px] font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Biz bilan bog'lanish
                            </h1>
                            <div className='mt-6 mb-[48px] flex flex-col'>
                                <p className='pb-2 text-[20px] font-semibold leading-[100%] text-[#2E90FA]'>
                                    +998 91 255 98 63
                                </p>
                                <p className={`pb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    (09:00-17:00 Dushanba-Shanba)
                                </p>
                                <p className={`pb-4 text-[16px] font-normal leading-[100%] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Biz ijtimoiy tarmoqlarda
                                </p>
                                <div className='flex gap-4'>
                                    <a 
                                        href="https://youtube.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                                    >
                                        <FaYoutube className="text-xl text-red-600" />
                                    </a>
                                    <a 
                                        href="https://t.me" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                                    >
                                        <FaTelegram className="text-xl text-blue-500" />
                                    </a>
                                    <a 
                                        href="https://tiktok.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                                    >
                                        <FaTiktok className="text-xl text-gray-800" />
                                    </a>
                                    <a 
                                        href="https://instagram.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                                    >
                                        <FiInstagram className="text-xl text-pink-600" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <hr className={`${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                    
                    {/* Bottom Section */}
                    <div className='flex py-6 mb-[34px] justify-between items-center'>
                        <div className='flex gap-6 items-center'>
                            <img 
                                src={isDark ? "/payme-white.png" : "/payme.png"} 
                                alt="Payme" 
                                className='h-8'
                            />
                            <img 
                                src={isDark ? "/click-white.png" : "/click.png"} 
                                alt="Click" 
                                className='h-8'
                            />
                            <img 
                                src={isDark ? "/uzcard-white.png" : "/uzcard.png"} 
                                alt="Uzcard" 
                                className='h-8'
                            />
                        </div>
                        <div>
                            <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <IoGlobeOutline className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                                <select 
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className={`bg-transparent border-none outline-none text-[16px] ${isDark ? 'text-gray-300' : 'text-gray-700'} font-normal cursor-pointer`}
                                >
                                    <option value="Uzbek">O'zbekcha</option>
                                    <option value="Russian">Ruscha</option>
                                    <option value="English">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Footer */}
                <div className='md:hidden'>
                    <div className='py-8'>
                        {/* Logo and Description */}
                        <div className='mb-8'>
                            <div className='flex gap-2 items-center mb-4'>
                                <img 
                                    src="/logo.png" 
                                    alt="Salonchi logo" 
                                    className='w-8 h-8'
                                />
                                <h1 className={`text-[#EA580C] text-[24px] font-semibold leading-[100%] font-Rubik`}>
                                    Salonchi
                                </h1>
                            </div>
                            <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-[140%]`}>
                                O'zbekistonning eng yirik onlayn do'koni. 1000+ do'kon va 10000+ mahsulot
                            </p>
                        </div>

                        {/* Grid Links */}
                        <div className='grid grid-cols-2 gap-6 mb-8'>
                            <div>
                                <h2 className={`text-[16px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Ma'lumotlar
                                </h2>
                                <div className='space-y-3'>
                                    <div className='flex items-start gap-2'>
                                        <CiLocationOn className='text-[#EA580C] text-[18px] flex-shrink-0 mt-0.5' />
                                        <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            4140 Parker Rd. Allentown
                                        </p>
                                    </div>
                                    <div className='flex items-start gap-2'>
                                        <CgMail className='text-[#EA580C] text-[18px] flex-shrink-0 mt-0.5' />
                                        <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            nathan.roberts@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className={`text-[16px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Tezkor havolalar
                                </h2>
                                <div className='space-y-3'>
                                    <a 
                                        href='/about' 
                                        className={`block text-[14px] ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                    >
                                        Biz haqimizda
                                    </a>
                                    <a 
                                        href='/news' 
                                        className={`block text-[14px] ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                    >
                                        Yangiliklar
                                    </a>
                                    <a 
                                        href='/partnership' 
                                        className={`block text-[14px] ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                    >
                                        Hamkorlik
                                    </a>
                                    <a 
                                        href='/help' 
                                        className={`block text-[14px] ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                                    >
                                        Yordam
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className='mb-8'>
                            <h2 className={`text-[16px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Aloqa
                            </h2>
                            <p className='text-[18px] font-semibold text-[#2E90FA] mb-2'>
                                +998 91 255 98 63
                            </p>
                            <p className={`text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                (09:00-17:00 Dushanba-Shanba)
                            </p>
                        </div>

                        {/* Social Media */}
                        <div className='mb-8'>
                            <h2 className={`text-[16px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Ijtimoiy tarmoqlar
                            </h2>
                            <div className='flex gap-3'>
                                {[
                                    { icon: FaYoutube, color: 'text-red-600', href: 'https://youtube.com' },
                                    { icon: FaTelegram, color: 'text-blue-500', href: 'https://t.me' },
                                    { icon: FaTiktok, color: 'text-black dark:text-white', href: 'https://tiktok.com' },
                                    { icon: FiInstagram, color: 'text-pink-600', href: 'https://instagram.com' },
                                    { icon: FiFacebook, color: 'text-blue-700', href: 'https://facebook.com' },
                                    { icon: FiTwitter, color: 'text-blue-400', href: 'https://twitter.com' },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                                    >
                                        <social.icon className={`text-xl ${social.color}`} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div className='mb-8'>
                            <h2 className={`text-[16px] font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                To'lov usullari
                            </h2>
                            <div className='flex gap-3'>
                                <img 
                                    src={isDark ? "/payme-white.png" : "/payme.png"} 
                                    alt="Payme" 
                                    className='h-7'
                                />
                                <img 
                                    src={isDark ? "/click-white.png" : "/click.png"} 
                                    alt="Click" 
                                    className='h-7'
                                />
                                <img 
                                    src={isDark ? "/uzcard-white.png" : "/uzcard.png"} 
                                    alt="Uzcard" 
                                    className='h-7'
                                />
                                <img 
                                    src={isDark ? "/humo-white.png" : "/humo.png"} 
                                    alt="Humo" 
                                    className='h-7'
                                />
                            </div>
                        </div>

                        {/* Language Selector */}
                        <div className='mb-8'>
                            <div className={`flex items-center gap-2 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                <IoGlobeOutline className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                                <select 
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className={`flex-1 bg-transparent border-none outline-none text-[14px] ${isDark ? 'text-gray-300' : 'text-gray-700'} font-normal`}
                                >
                                    <option value="Uzbek">O'zbekcha</option>
                                    <option value="Russian">Ruscha</option>
                                    <option value="English">English</option>
                                </select>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className='pt-6 border-t border-gray-700'>
                            <p className={`text-center text-[14px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                © 2024 Salonchi. Barcha huquqlar himoyalangan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add responsive padding for mobile bottom navigation */}
            <div className='md:hidden h-16'></div>
        </footer>
    )
}