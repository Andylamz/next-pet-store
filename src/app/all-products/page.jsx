"use client";

import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchAllProduct() {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/getAllProducts");
      if (res.data.success) {
        setData(res.data.data);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchAllProduct();
  }, []);
  return (
    <div className="flex w-full xl:px-35 md:px-10 px-4 mt-8 text-center items-center flex-col">
      <h3 className="font-semibold text-2xl mb-8">All Products</h3>
      {!isLoading && data && (
        <div className="flex mt-8 justify-center">
          <div className="flex flex-wrap gap-10 justify-center">
            {data?.map((product) => (
              <ProductCard
                key={product._id}
                fixedSize={true}
                name={product.name}
                description={product.description}
                image={product.image}
                price={product.price}
                productId={product._id}
              />
            ))}
          </div>
        </div>
      )}
      {/* Loading UI */}
      {isLoading && (
        <div className="flex min-h-screen w-full justify-center items-center -translate-y-[30%]">
          Loading...
        </div>
      )}
    </div>
  );
}

export default page;
