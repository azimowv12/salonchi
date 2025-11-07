"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import '../../app/globals.css';

import { Navigation } from 'swiper/modules';

export default function Swipper() {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper   max-w-7xl h-[400px]  mx-auto rounded-[35px] mt-10 ">
                <SwiperSlide>
                    <img src="/swiper.png" alt="Swiper"  />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/swiper.png" alt="Swiper" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/swiper.png" alt="Swiper" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
