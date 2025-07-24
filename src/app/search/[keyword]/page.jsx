"use client";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function page({ params }) {
  const [isLoading, setIsLoading] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const getParams = useParams();
  const rawKeyword = getParams.keyword;
  const keyword = decodeURIComponent(rawKeyword).toLowerCase();
  console.log("kw", keyword);

  async function fetchfilteredData() {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/getAllProducts");
      if (res.data.success) {
        console.log(res.data.data);
        const data = res.data.data.filter((item) => {
          return (
            item.name.toLowerCase().includes(keyword) ||
            item.category.toLowerCase().includes(keyword)
          );
        });
        setFilteredData(data);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchfilteredData();
  }, []);

  return (
    <div className=" xl:px-35 md:px-10 px-4 mt-10">
      {!isLoading && filteredData.length > 0 && (
        <p className="text-lg text-[#aaacae]">
          Showing results for '{keyword}', {filteredData.length} results found
        </p>
      )}
      <div className="flex flex-wrap gap-10 justify-center mt-8">
        {!isLoading &&
          filteredData &&
          filteredData.map((product) => (
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
  );
}

export default page;
