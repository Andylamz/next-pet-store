"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Scrollbar, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

function Slider() {
  return (
    <Swiper
      modules={[Scrollbar, Autoplay]}
      className="w-full max-md:min-h-[500px] rounded-xl overflow-hidden mt-8"
      loop={true}
      spaceBetween={50}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      autoplay={{ delay: 2500 }}
    >
      <SwiperSlide className="">
        <Link href={"/"}>
          <Image
            src="/assets/swiper1_lg.webp"
            alt="advert1"
            width={4096}
            height={1624}
            className="w-full md:block hidden"
          />
          <Image
            src="/assets/swiper1_sm.webp"
            alt="advert1-small"
            width={1536}
            height={1014}
            className="w-full md:hidden object-cover max-md:min-h-[500px]"
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href={"/"}>
          <Image
            src="/assets/swiper2_lg.webp"
            alt="advert2"
            width={4096}
            height={1624}
            className="w-full md:block object-cover  hidden"
          />
          <Image
            src="/assets/swiper2_sm.webp"
            alt="advert2-small"
            width={1536}
            height={1014}
            className="w-full md:hidden object-cover max-md:min-h-[500px]"
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Image
          src="/assets/Banner_placeholder.jpg"
          alt="placeholder"
          width={1536}
          height={1014}
          className="w-full object-cover max-md:min-h-[500px]"
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
