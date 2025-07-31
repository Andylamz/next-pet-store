"use client";
import UserOrderCom from "@/components/user/UserOrderCom";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

function page() {
  const [orders, setOrders] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const user = useUser();
  const buyerMongoId = user?.user?.publicMetadata.mongoId;

  async function fetchUserOrders() {
    try {
      const res = await axios.get("/api/UserOrders", {
        params: {
          buyerMongoId,
          isDetails: false,
        },
      });
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (buyerMongoId && !isFetched) {
      fetchUserOrders();
      setIsFetched(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center xl:px-35 md:px-10 px-4 mt-8 w-full ">
      <h3 className="w-full max-w-[1100px] text-xl font-semibold text-[#aaacae]">
        Recent Orders
      </h3>
      <div className="w-full max-w-[1100px] mt-8 flex flex-col gap-3">
        {orders?.length > 0 &&
          orders
            .slice()
            .reverse()
            .map((order) => (
              <UserOrderCom
                key={order._id}
                buyerMongoId={order.buyerMongoId}
                createdAt={order.createdAt}
                products={order.products}
                totalPrice={order.totalPrice}
                orderId={order._id}
                image={order.products[0].image}
                name={order.products[0].name}
                status={order.status}
              />
            ))}
        {orders?.length === 0 && (
          <div className="px-3 pt-40 text-center rounded-md text-[#aaacae]">
            No Orders
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
