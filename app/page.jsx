import Footer from '@/components/Footer'
import Hero from '@/components/Home/hero'
import Swipper from '@/components/Home/Swipper'
import Navbar from '@/components/Navbar'
import NavbarTop from '@/components/navbarTop'
import Product from '@/components/Product'
import React from 'react'

export default function App() {
  return (
    <div className=''>
      <div className="bg-[#F7F7F7]">
        {/* <Product /> */}
        <Swipper />
        <Hero />
      </div>
     
      
    </div>
  )
}
