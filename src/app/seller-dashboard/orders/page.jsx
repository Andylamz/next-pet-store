"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderCom from "@/components/seller/OrderCom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState();
  const { user } = useUser();

  async function getSellerOrders() {
    setIsLoading(true);

    try {
      const res = await axios.get("/api/seller/getOrders", {
        params: {
          sellerMongoId: user?.publicMetadata.mongoId,
        },
      });

      if (res.data.success) {
        console.log(res.data.data);
        setData(res.data.data);
      }
    } catch {
      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isFetched && user) {
      getSellerOrders();
      setIsFetched(true);
    }
  }, [user]);

  return (
    <div>
      <h3 className="font-bold text-2xl text-center mt-8">Orders</h3>
      {!isLoading && data ? (
        <div className="w-full mx-auto max-w-[1100px] mt-8">
          {data
            .slice()
            .reverse()
            .map((product) => (
              <OrderCom key={product._id} data={product} />
            ))}
        </div>
      ) : (
        <div className="w-[50px] mx-auto mt-50 ">
          <FontAwesomeIcon icon={faSpinner} spinPulse className="w-full" />
        </div>
      )}
      {!isLoading && data?.length === 0 && (
        <div className="flex min-h-[60%] mt-50 justify-center items-center text-center text-2xl">
          No Orders
        </div>
      )}
    </div>
  );
}

export default page;
