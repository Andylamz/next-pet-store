"use client";

import axios from "axios";
import OrderProductDetail from "@/components/OrderProductDetails";
import { use, useEffect, useState } from "react";

function page({ params }) {
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { orderId } = use(params);
  const trackingNumber = "AL123456789YT";

  const totalUIPrice = order?.products?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const dateString = new Date(order?.createdAt);
  const discount =
    order?.discount === "true" ? Number(totalUIPrice * 0.1).toFixed(2) : 0;

  const date = dateString.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  async function getOrderDetails() {
    setIsLoading(true);
    const res = await axios.get("/api/UserOrders", {
      params: {
        orderId,
        isDetails: true,
      },
    });
    if (res.data.success) {
      setOrder(res.data.data);
      console.log(res.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className="xl:px-35 md:px-10 px-4 mt-8 ">
      {!isLoading && order ? (
        <div>
          <h1 className="font-semibold text-[#aaacae] text-xl mb-4">
            Order Details
          </h1>
          <div className="border border-[#aaacae] flex rounded-md overflow-hidden lg:flex-row flex-col">
            {/* Left- ordered product details */}
            <div className="flex-3 px-3 py-6">
              <div className="flex flex-col gap-4 px-2">
                {order &&
                  order?.products?.map((product) => (
                    <OrderProductDetail
                      key={product._id}
                      product={product}
                      tracking={trackingNumber}
                    />
                  ))}
              </div>
            </div>
            {/* Right - summary */}
            <div className="flex-1 p-3 bg-[#aaacae] text-white">
              <div>
                <div>
                  <p>Order Details</p>
                  <div className="border border-white rounded-md px-3 py-2 mt-2 sm:text-md text-sm">
                    <div className="flex sm:gap-2 sm:flex-row flex-col max-sm:mb-2">
                      <p className="block min-w-[113px]">Order created</p>
                      <p>{date}</p>
                    </div>
                    <div className="flex sm:gap-2 sm:flex-row flex-col">
                      <p className="block min-w-[110px]">Order No</p>
                      <div className="flex flex-wrap">{orderId}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <p>Delivery Details</p>
                  <div className="border border-white rounded-md px-3 py-2 mt-2">
                    <div>{order?.buyerName}</div>
                    <div>{order?.address?.street}</div>
                    <div>{order?.address?.city}</div>
                    <div>{order?.address?.postcode}</div>
                    <div>{order.phone}</div>
                  </div>
                </div>
                <div className="mt-8 mb-4">
                  <p>Order Summary</p>
                  <div className="border border-white rounded-md px-3 py-2 mt-2">
                    <div className="flex justify-between">
                      <p>Item(s) Subtotal:</p>
                      <p>£{totalUIPrice}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Delivery charge:</p>
                      <p>£0.00</p>
                    </div>
                    {order.discount === "true" && (
                      <div className="flex justify-between">
                        <p>discount (-10%)</p>
                        <p>-£{Number(discount)}</p>
                      </div>
                    )}
                    <div className="flex justify-between font-bold mt-1">
                      <p>Total</p>
                      <p>
                        £
                        {order.discount === "true"
                          ? (totalUIPrice - discount).toFixed(2)
                          : totalUIPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center my-8"> Loading... </div>
      )}
    </div>
  );
}

export default page;
