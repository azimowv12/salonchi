import Aksiya from '@/components/Home/aksiya'
import Cheap from '@/components/Home/cheap'
import Fenlar from '@/components/Home/Fenlar'
import Hero from '@/components/Home/hero'
import Qaychilar from '@/components/Home/Qaychi'
import Soch from '@/components/Home/Soch'
import Swipper from '@/components/Home/Swipper'
import Yangiliklar from '@/components/Home/Yangiliklar'
import Product from '@/components/Product'
import React from 'react'

export default function App() {
  return (
    <div className='bg-[#F7F7F7]'>
      <Product/>
       <Swipper/>
      <Hero/>
      <Cheap/>
      <Aksiya/>
      <Yangiliklar/>
      <Qaychilar/>
      <Fenlar/>
      <Soch/>
    </div>
  )
}
