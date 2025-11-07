import React from 'react'
import { CiLocationOn } from 'react-icons/ci'
import { CgMail } from "react-icons/cg";

export default function Footer() {
    return (
        <div className='max-w-7xl mx-auto mt-[94px] '>
            <div className='flex justify-between '>
                <div>
                    <div className='flex  gap-2 items-center '>
                        <img src="./logo.png" alt="" />
                        <h1 className='text-[#EA580C] text-[24px] font-semibold leading-[100%] font-Rubik '>Salonchi</h1>
                    </div>
                    <p className='text-[16px] leading-[100%] font-normal mt-5'>2024 Barcha huquqlar himoyalangan</p>
                </div>
                <div>
                    <h1>Ma’lumotlar</h1>
                    <div className=' flex gap-3  mt-6'>
                        <CiLocationOn className='text-[#EA580C] text-[18px]' />
                        <p className='text-[16px] text-[#4D5761] max-w-[250px] font-normal leading-[100%]
                        '>4140 Parker Rd. Allentown, New Mexico</p>
                    </div>
                    <div className='flex gap-3 mt-5'>
                        <CgMail  className='text-[#EA580C] text-[18px]' />
                        <p className='text-[16px] text-[#4D5761] max-w-[250px] font-normal leading-[100%]
                        '>nathan.roberts@example.com</p>
                    </div>
                </div>
                <div className="">
                    <h1>Takliflar</h1>
                    <div className=' mt-6   flex flex-col gap-3 text-[16px] text-[#4D5761] font-normal leading-[100%]'>

                    <p>Biz haqimizda</p>
                    <p>Yangiliklar</p>
                    <p>Hamkorlik</p>
                    <p>Yordam</p>
                    </div>
                </div>
                <div className="max-w-[249px]">
                    <h1>Biz bilan bog’lanish</h1>
                    <div className=' mt-6 mb-[48px]  flex flex-col  text-[16px] text-[#4D5761] font-normal leading-[100%]'>
                        <p className='pb-2 text-[20px] font-semibold leading-[100%] text-[#2E90FA]'>+998 91 255 98 63</p>
                        <p className='pb-8 text-[#4D5761] '>(09:00-17:00 Dushanba-Shanba)</p>
                        <p className='pb-4 text-[16px] font-normal leading-[100%] w-[177px] le'>Biz ijtimoiy tarmoqlarda</p>
                        <div className='flex gap-6'>
                            <img src="./youtube.png " alt="" />
                            <img src="./telegram.png " alt="" />
                            <img src="./tik_tok.png " alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <hr className='text-[#E5E7EB] mb-4' />
            <div className='flex  mb-[34px] justify-between items-center'>
                <div className='flex gap-6 '>
                <img src="./payme.png" alt="" />
                <img src="./clic.png" alt="" />
                </div>
                <div>
                    <select name="" id="" className='border-none outline-none text-[16px] text-[#4D5761] p-3 font-normal'>
                            <option className='text-[#4D5761] ' value="">O’zbekcha</option>
                            <option className='text-[#4D5761]' value="">Ruscha</option>
                        </select>
                </div>
            </div>

        </div>
    )
}
