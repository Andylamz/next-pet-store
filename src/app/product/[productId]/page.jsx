"use client";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import RecommendSlider from "@/components/RecommendSlider";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
function page({ params }) {
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = use(params);
  const user = useUser();
  const buyerMongoId = user?.user?.publicMetadata?.mongoId;

  function handleCounter(action) {
    if (action === "add") {
      setQuantity((quantity) => quantity + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  }

  async function fetchProductData() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/getProductInfo", {
        params: {
          productId,
        },
      });
      if (res.data.success) {
        setData(res.data.data);
        return setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddToCart() {
    try {
      const res = await axios.post("/api/cartInfo", {
        productId,
        buyerMongoId,
        quantity,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.msg, {
          autoClose: 1000,
        });
      }
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1000,
      });
    }
  }

  useEffect(() => {
    console.log("effect");
    fetchProductData();
  }, []);

  return (
    <>
      {data && (
        <div className=" mt-25 xl:px-35 md:px-10 px-4">
          <div className="flex justify-center max-lg:flex-col max-lg:items-center gap-20">
            <div className="min-w-[500px] max-md:min-w-[350px]">
              <Image
                src={data.image}
                width={500}
                height={200}
                alt={`Image of ${data?.name}`}
              />
            </div>
            <div className="max-w-[600px] max-md:w-full text-[#aaacae]">
              <h4 className="text-2xl font-bold ">{data.name}</h4>
              <div className="mt-10 whitespace-pre-line text-md text-[#aaacae] border-b pb-10 border-[#ccced1]">
                <p>{data.description}</p>
                <p className="mt-10 font-bold text-3xl">£{data.price}</p>
              </div>

              {/* Lower part */}

              <div className="flex mt-10 items-center gap-10 max-sm:flex-col">
                <div className="flex text-black dark:text-white items-center gap-2 max-sm:w-full">
                  <button
                    className="bg-[#aaacae] px-5 py-3 cursor-pointer hover:bg-[#7c7d7f]"
                    onClick={(e) => handleCounter("minus")}
                  >
                    -
                  </button>
                  <span className="flex-1 px-10 text-center w-4">
                    {quantity}
                  </span>
                  <button
                    className="bg-[#aaacae] px-5 py-3 cursor-pointer hover:bg-[#7c7d7f] "
                    onClick={(e) => handleCounter("add")}
                  >
                    +
                  </button>
                </div>
                <div className="max-sm:w-full" onClick={handleAddToCart}>
                  <button className="px-10 py-3 bg-[#fc9e2c] text-white hover:bg-[#ff8c00] transition-colors duration-200 cursor-pointer whitespace-nowrap max-sm:w-full ">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-26">
            <RecommendSlider title="Products you might find interesting" />
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center min-h-screen items-center text-2xl text-[#aaacae]">
          Loading...
        </div>
      )}
    </>
  );
}

export default page;
