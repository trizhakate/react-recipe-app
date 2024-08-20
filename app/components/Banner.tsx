'use client';

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'; 
import 'swiper/css/autoplay'; 
import { Pagination, Autoplay } from 'swiper/modules'; 

import BannerPic1 from "../../public/assets/banner1.png";
import BannerPic2 from "../../public/assets/banner2.png";
import BannerPic3 from "../../public/assets/banner3.png";

export function Banner() {
    return (
        <div className="flex flex-col lg:flex-row w-full items-center justify-between lg:container lg:mx-auto lg:px-20 overflow-hidden">
            <div className="flex flex-col justify-center w-full lg:w-1/2 mb-8 lg:mb-0 px-4 lg:px-0">
                <h1 className="text-4xl lg:text-7xl font-bold mb-4">Your Text Here</h1>
                <p className="text-base lg:text-lg text-gray-700 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac libero eu odio malesuada ultricies. 
                    Vivamus et sollicitudin libero. Aenean vehicula mauris at risus consequat, sit amet varius libero tincidunt.
                </p>
                <div className="flex flex-col lg:flex-row gap-4 w-full">
                    <button className="px-4 py-2 bg-black text-white font-semibold rounded shadow-lg hover:bg-gray-800 lg:w-auto w-full">
                        Button 1
                    </button>
                    <button className="px-4 py-2 bg-white text-black font-semibold rounded shadow-lg hover:bg-gray-100 border border-gray-300 lg:w-auto w-full">
                        Button 2
                    </button>
                </div>
            </div>
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[500px] relative overflow-hidden">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    modules={[Pagination, Autoplay]}
                    className="w-full h-full"
                >
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image 
                                src={BannerPic1} 
                                alt="Banner 1" 
                                layout="fill" 
                                objectFit="contain" 
                                className="absolute inset-0"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image 
                                src={BannerPic2} 
                                alt="Banner 2" 
                                layout="fill" 
                                objectFit="contain" 
                                className="absolute inset-0"
                            />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <Image 
                                src={BannerPic3} 
                                alt="Banner 3" 
                                layout="fill" 
                                objectFit="contain" 
                                className="absolute inset-0"
                            />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
}
