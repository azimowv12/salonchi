import React from 'react'

export default function Product() {
  return (
    <div className='max-w-7xl mx-auto flex gap-[39.14px] mt-8 hidden md:flex'>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/stoll.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Kreslo</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/kasmetik.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Kosmetologiya asboblari</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/mashinka.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Mashinka</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/Elektr ustara.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Elektr ustara</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/trimmer.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Trimmer</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/fen.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Fen</h1>
      </div>
      <div className='flex gap-2 items-center text-[#4D5761] font-medium'>
        <img src="/products/epilyator.png" alt="" className='w-6' />
        <h1 className='text-[16px] font-medium leading-[100%]'>Epilyator</h1>
      </div>
      <select name="" id="" className='text-[#4D5761] text-[16px] font-medium leading-[100%] pr-2 '>
        <option className='text-[#4D5761] ' value="">Barchasini ko’rish</option>
      </select>
    </div>
  )
}
