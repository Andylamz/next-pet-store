"use client";
import ProductCom from "@/components/seller/ProductCom";
import { useUser } from "@clerk/nextjs";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  const user = useUser();
  const { isLoaded } = useUser();
  const sellerMongoId = user?.user?.publicMetadata?.mongoId;
  async function fetchProductData() {
    const res = await axios.get("/api/seller/getProduct", {
      params: {
        sellerMongoId,
      },
    });

    if (res.data.success) {
      setData(res.data.data);
    }
  }
  useEffect(() => {
    if (user && user?.user?.publicMetadata?.mongoId && !hasFetched) {
      fetchProductData();
      setHasFetched(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center mt-8 h-full">
      <h3 className="font-bold text-2xl">PRODUCT LIST</h3>
      <div className="flex flex-col gap-2 w-full max-h-[800px] max-w-[1100px] overflow-y-auto mt-8 hide-scrollbar">
        {isLoaded &&
          data.length > 0 &&
          data
            .slice()
            .reverse()
            .map((product) => (
              <ProductCom
                key={product._id}
                category={product.category}
                sellerMongoId={product.sellerMongoId}
                name={product.name}
                image={product.image}
                price={product.price}
                productId={product._id}
                fetchProductData={fetchProductData}
              />
            ))}
      </div>
      {isLoaded && !data.length && (
        <div className="flex mt-50 min-h-[60%] justify-center items-center text-center text-2xl">
          <p>No Products</p>
        </div>
      )}
      {!isLoaded && (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          className="min-w-[30px] max-w-[30px]"
        />
      )}
    </div>
  );
}

export default page;
