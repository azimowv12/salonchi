"use client"
import Footer from '@/components/Footer'
import Hero from '@/components/Home/hero'
import Swipper from '@/components/Home/Swipper'
import Navbar from '@/components/Navbar'
import NavbarTop from '@/components/navbarTop'
import Product from '@/components/Product'
import React from 'react'
import { useDarkMode } from '@/context/DarkModeContext'

export default function App() {
  const { isDark } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`${isDark ? 'bg-gray-900' : 'bg-[#F7F7F7]'}`}>
        <Swipper />
        <Hero />
      </div>
    </div>
  )
}