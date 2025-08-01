"use client";
import { Swiper } from "swiper/react";
import ProductCard from "./ProductCard";
import { Controller, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

function RecommendSlider({ title }) {
  const [data, setData] = useState([]);

  async function fetchAllProductsData() {
    const res = await axios.get("/api/getAllProducts");
    if (res.data.success) {
      return setData(res.data);
    } else {
      return null;
    }
  }

  useEffect(() => {
    fetchAllProductsData();
  }, []);
  return (
    <div className="mt-24">
      <h2 className="font-semibold text-3xl mb-8">{title}</h2>
      <Swiper
        modules={[Navigation]}
        centeredSlides={false}
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        navigation
        // style={{ width: "100%" }}
        // controller={{ control: controllerSwiper }}
      >
        {data.data?.length > 0 &&
          data.data.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                fixedSize={false}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                productId={product._id}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default RecommendSlider;
