    import React from 'react'
    import Title from '../ui/title'
    import { GrFavorite } from 'react-icons/gr'
    import { IoCartOutline, IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

    export default function Fenlar() {
        return (
            <div className='max-w-7xl mx-auto '>
                <div className=''>
                    <Title text={"Fenlar"} />
                </div>
                <div className='grid grid-cols-5 gap-8'>
                    <div className='w-[224px] h-[387px] bg-white rounded-[12px] mt-8 relative '>
                        <div className='pt-[24px] pb-12px  flex flex-col items-center relative '>
                            <img src="/cart.svg" alt="" />
                            <div className=' absolute top-0 right-0 mt-4 mr-4 text-[21px] text-[#6C737F] rounded-full'>
                                <GrFavorite />
                            </div>
                        </div>

                        <div className='pl-[16px] pt-[12px] pb-5 flex flex-col gap-2'>
                            <h1 className='text-[#4D5761] text-[14px] font-normal leading-[100%]'>Soch qirqish mashinasi</h1>
                            <h2 className='text-[#9DA4AE] text-[13px] font-normal leading-[100%]'>⭐4.7 (10 sharhlar)</h2>
                            <h2 className='text-[#EA580C] text-[13px] font-normal leading-[100%]'>33,000 so’m/oyiga</h2>
                            <h2 className='text-[#6C737F] text-[13px] font-normal leading-[100%] line-through'>299,000 so’m</h2>
                            <h2 className='text-[#1F2A37] text-[16px] font-medium'>299,000 so’m</h2>
                        </div>
                        <div className='flex gap-2 pl-[16px] pb-[19px]  '>
                            <button className=' h-[36px] w-[44px] bg-[#EA580C] text-[20px] py-2 px-3 rounded-[8px]'><IoCartOutline /></button>
                            <button className=' h-[36px] w-[140px] bg-[#EA580C] text-[14px] leading-[100%] font-medium   rounded-[8px]'>Xarid qilish</button>
                        </div>
                        <div className="absolute top-[148px] left-[-20px] w-10 h-10 flex items-center justify-center text- text-white bg-[#EA580C] rounded-full p-2">
                            <IoChevronBackOutline className='' />
                        </div>
                    </div>
                    <div className='w-[224px] h-[387px] bg-white rounded-[12px] mt-8 '>
                        <div className='pt-[24px] pb-12px  flex flex-col items-center relative '>
                            <img src="/cart.svg" alt="" />
                            <div className=' absolute top-0 right-0 mt-4 mr-4 text-[21px] text-[#6C737F] rounded-full'>
                                <GrFavorite />
                            </div>
                        </div>
                        <div className='pl-[16px] pt-[12px] pb-5 flex flex-col gap-2'>
                            <h1 className='text-[#4D5761] text-[14px] font-normal leading-[100%]'>Soch qirqish mashinasi</h1>
                            <h2 className='text-[#9DA4AE] text-[13px] font-normal leading-[100%]'>⭐4.7 (10 sharhlar)</h2>
                            <h2 className='text-[#EA580C] text-[13px] font-normal leading-[100%]'>33,000 so’m/oyiga</h2>
                            <h2 className='text-[#6C737F] text-[13px] font-normal leading-[100%] line-through'>299,000 so’m</h2>
                            <h2 className='text-[#1F2A37] text-[16px] font-medium'>299,000 so’m</h2>
                        </div>
                        <div className='flex gap-2 pl-[16px] pb-[19px]  '>
                            <button className=' h-[36px] w-[44px] bg-[#EA580C] text-[20px] py-2 px-3 rounded-[8px]'><IoCartOutline /></button>
                            <button className=' h-[36px] w-[140px] bg-[#EA580C] text-[14px] leading-[100%] font-medium   rounded-[8px]'>Xarid qilish</button>
                        </div>
                    </div>
                    <div className='w-[224px] h-[387px] bg-white rounded-[12px] mt-8 '>
                        <div className='pt-[24px] pb-12px  flex flex-col items-center relative '>
                            <img src="/cart.svg" alt="" />
                            <div className=' absolute top-0 right-0 mt-4 mr-4 text-[21px] text-[#6C737F] rounded-full'>
                                <GrFavorite />
                            </div>
                        </div>
                        <div className='pl-[16px] pt-[12px] pb-5 flex flex-col gap-2'>
                            <h1 className='text-[#4D5761] text-[14px] font-normal leading-[100%]'>Soch qirqish mashinasi</h1>
                            <h2 className='text-[#9DA4AE] text-[13px] font-normal leading-[100%]'>⭐4.7 (10 sharhlar)</h2>
                            <h2 className='text-[#EA580C] text-[13px] font-normal leading-[100%]'>33,000 so’m/oyiga</h2>
                            <h2 className='text-[#6C737F] text-[13px] font-normal leading-[100%] line-through'>299,000 so’m</h2>
                            <h2 className='text-[#1F2A37] text-[16px] font-medium'>299,000 so’m</h2>
                        </div>
                        <div className='flex gap-2 pl-[16px] pb-[19px]  '>
                            <button className=' h-[36px] w-[44px] bg-[#EA580C] text-[20px] py-2 px-3 rounded-[8px]'><IoCartOutline /></button>
                            <button className=' h-[36px] w-[140px] bg-[#EA580C] text-[14px] leading-[100%] font-medium   rounded-[8px]'>Xarid qilish</button>
                        </div>
                    </div>
                    <div className='w-[224px] h-[387px] bg-white rounded-[12px] mt-8 '>
                        <div className='pt-[24px] pb-12px  flex flex-col items-center relative '>
                            <img src="/cart.svg" alt="" />
                            <div className=' absolute top-0 right-0 mt-4 mr-4 text-[21px] text-[#6C737F] rounded-full'>
                                <GrFavorite />
                            </div>
                        </div>
                        <div className='pl-[16px] pt-[12px] pb-5 flex flex-col gap-2'>
                            <h1 className='text-[#4D5761] text-[14px] font-normal leading-[100%]'>Soch qirqish mashinasi</h1>
                            <h2 className='text-[#9DA4AE] text-[13px] font-normal leading-[100%]'>⭐4.7 (10 sharhlar)</h2>
                            <h2 className='text-[#EA580C] text-[13px] font-normal leading-[100%]'>33,000 so’m/oyiga</h2>
                            <h2 className='text-[#6C737F] text-[13px] font-normal leading-[100%] line-through'>299,000 so’m</h2>
                            <h2 className='text-[#1F2A37] text-[16px] font-medium'>299,000 so’m</h2>
                        </div>
                        <div className='flex gap-2 pl-[16px] pb-[19px]  '>
                            <button className=' h-[36px] w-[44px] bg-[#EA580C] text-[20px] py-2 px-3 rounded-[8px]'><IoCartOutline /></button>
                            <button className=' h-[36px] w-[140px] bg-[#EA580C] text-[14px] leading-[100%] font-medium   rounded-[8px]'>Xarid qilish</button>
                        </div>
                    </div>
                    <div className='w-[224px] h-[387px] bg-white rounded-[12px] mt-8 relative '>
                        <div className='pt-[24px] pb-12px  flex flex-col items-center relative '>
                            <img src="/cart.svg" alt="" />
                            <div className=' absolute top-0 right-0 mt-4 mr-4 text-[21px] text-[#6C737F] rounded-full'>
                                <GrFavorite />
                            </div>
                        </div>
                        <div className='pl-[16px] pt-[12px] pb-5 flex flex-col gap-2'>
                            <h1 className='text-[#4D5761] text-[14px] font-normal leading-[100%]'>Soch qirqish mashinasi</h1>
                            <h2 className='text-[#9DA4AE] text-[13px] font-normal leading-[100%]'>⭐4.7 (10 sharhlar)</h2>
                            <h2 className='text-[#EA580C] text-[13px] font-normal leading-[100%]'>33,000 so’m/oyiga</h2>
                            <h2 className='text-[#6C737F] text-[13px] font-normal leading-[100%] line-through'>299,000 so’m</h2>
                            <h2 className='text-[#1F2A37] text-[16px] font-medium'>299,000 so’m</h2>
                        </div>
                        <div className='flex gap-2 pl-[16px] pb-[19px]  '>
                            <button className=' h-[36px] w-[44px] bg-[#EA580C] text-[20px] py-2 px-3 rounded-[8px]'><IoCartOutline /></button>
                            <button className=' h-[36px] w-[140px] bg-[#EA580C] text-[14px] leading-[100%] font-medium   rounded-[8px]'>Xarid qilish</button>
                        </div>
                        <div className="absolute top-[148px] right-[-20px] w-10 h-10 flex items-center justify-center text- text-white bg-[#EA580C] rounded-full p-2">
                            <IoChevronForwardOutline className='' />
                        </div>
                    </div>
                </div>
                <div>
                    <img src="./home.png" alt="" className='my-[72px]' />
                </div>
            </div>
        )
    }
