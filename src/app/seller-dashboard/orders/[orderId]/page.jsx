"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { use, useEffect, useState } from "react";
import OrderProductDetail from "@/components/OrderProductDetails";
import { toast } from "react-toastify";

function page({ params }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [tracking, setTracking] = useState("");
  const { user } = useUser();
  const { orderId } = use(params);
  const filteredOrder = data?.filter((order) => order._id === orderId);
  const currentOrder = filteredOrder ? filteredOrder[0] : [];
  console.log("currentOrder:", currentOrder);

  const totalUIPrice = currentOrder?.products?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);

  const dateString = new Date(currentOrder?.createdAt);
  const date = dateString.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sellerMongoId = user?.publicMetadata.mongoId;

  async function handleSubmitTracking(e) {
    e.preventDefault();
    console.log(tracking);
    try {
      const res = await axios.patch("/api/seller/getOrders", {
        orderId,
        tracking,
        sellerMongoId,
      });

      if (res.data.success) {
        toast.success("Tracking Number Added", {
          autoClose: 1500,
        });
        getOrderData();
      }
    } catch {
      console.log("error");
    }
  }

  async function getOrderData() {
    console.log("fetched");
    setIsLoading(true);
    try {
      const res = await axios.get("/api/seller/getOrders", {
        params: {
          sellerMongoId,
        },
      });

      if (res.data.success) {
        console.log(res.data.data);
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isFetched && user) {
      getOrderData();
      setIsFetched(true);
    }
  }, [user]);
  return (
    <div className="mt-8">
      {!isLoading && currentOrder.products ? (
        <div>
          <h1 className="font-semibold text-[#aaacae] text-xl mb-4">
            Order Details
          </h1>
          <div className="border border-[#aaacae] flex rounded-md overflow-hidden lg:flex-row flex-col">
            {/* Left- ordered product details */}
            <div className="flex flex-col justify-between flex-3">
              <div className="px-3 py-6">
                <div className="flex flex-col gap-4 px-2">
                  {currentOrder &&
                    currentOrder?.products
                      ?.slice()
                      .reverse()
                      .map((product) => (
                        <OrderProductDetail
                          key={product._id}
                          product={product}
                        />
                      ))}
                </div>
              </div>
              <div className="flex items-center mt-6 px-4 py-6 border-t border-[#aaacae] text-[#aaacae] max-h-[75px] ">
                <div className="flex gap-1">
                  <p>Status:</p> <p>{currentOrder.status}</p>
                </div>
                {currentOrder.status === "paid" && (
                  <form
                    className="flex sm:ml-5 gap-1"
                    onSubmit={(e) => handleSubmitTracking(e)}
                  >
                    <input
                      type="text"
                      className="border px-2 py-1"
                      name="tracking"
                      placeholder="Enter tracking number"
                      onChange={(e) => setTracking(e.target.value)}
                    />
                    <button className="border px-2 ">dispatch</button>
                  </form>
                )}
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
                    <div>{currentOrder?.buyerName}</div>
                    <div>{currentOrder?.address?.street}</div>
                    <div>{currentOrder?.address?.city}</div>
                    <div>{currentOrder?.address?.postcode}</div>
                    <div>{currentOrder.phone}</div>
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
                    <div className="flex justify-between font-bold mt-1">
                      <p>Total</p>
                      <p>£{totalUIPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-40">Loading...</div>
      )}
    </div>
  );
}

export default page;
