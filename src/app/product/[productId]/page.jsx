"use client";
import Image from "next/image";
import { use, useState } from "react";

function page({ params }) {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { productId } = use(params);

  function handleCounter(action) {
    if (action === "add") {
      setQuantity((quantity) => quantity + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  }

  return (
    <div className=" mt-8 xl:px-35 md:px-10 px-4">
      {/*  ---------------------------------------- Big Screen ----------------------------------- */}
      <div className="flex justify-center gap-35">
        <div className="min-w-[500px]">
          <Image
            src="/assets/dogfood3.jpg"
            width={500}
            height={200}
            alt="dog food"
          />
        </div>
        <div className="max-w-[600px] text-[#aaacae]">
          <h4 className="text-2xl font-bold ">
            Royal Canin Labrador Retriever Adult
          </h4>
          <div className="mt-10 text-md text-[#aaacae] border-b pb-10 border-[#ccced1]">
            <p>
              The Labrador Retriever is a unique and versatile dog, full of
              charm and joie de vivre. This breed loves physical activity,
              whether that be through hunting, working or simply going for a
              walk - it's a ball of energy! Each dog is unique, so this breed
              requires a unique food such as this Royal Canin Labrador Retriever
              Adult. All Royal Canin products undergo a strict quality control
              process to ensure the best possible food quality for your dog,
              tailored to the individual nutritional needs and lifestyle of your
              dog. Dishes from the Breed Health Nutrition Range all contain
              high-quality protein and a balanced nutritional profile. The
              kibble is also tailored to the size, shape and texture best suited
              to your dog's breed.
            </p>
            <p className="mt-10 font-bold text-3xl">£59.9</p>
          </div>
          {/* Lower part */}
          <div className="flex mt-10 items-center gap-10">
            <div className="flex text-black dark:text-white items-center gap-2">
              <button
                className="bg-[#aaacae] px-5 py-2 cursor-pointer hover:bg-[#7c7d7f]"
                onClick={(e) => handleCounter("minus")}
              >
                -
              </button>
              <span className="px-10 w-4">{quantity}</span>
              <button
                className="bg-[#aaacae] px-5 py-3 cursor-pointer hover:bg-[#7c7d7f] "
                onClick={(e) => handleCounter("add")}
              >
                +
              </button>
            </div>
            <div>
              <button className="px-20 py-3 bg-[#fc9e2c] text-white hover:bg-[#ff8c00] transition-colors duration-200 cursor-pointer">
                {" "}
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
