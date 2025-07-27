"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const [buyerName, setBuyerName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  console.log(orderId);

  async function handlePlaceOrder(e) {
    e.preventDefault();
    try {
      const res = await axios.patch("/api/placeOrder/", {
        buyerName,
        orderId,
        address: {
          street,
          postcode,
          city,
        },
        phone,
        status: "paid",
      });
      if (res.data.success) {
        router.push("/user/verify");
      }
    } catch {
      console.log("Failed");
    }
  }

  return (
    <div className="xl:px-35 md:px-10 px-4 w-full mt-8">
      <form className="flex flex-col justify-center max-w-125 mx-auto px-2">
        {/* Personal Info */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium max-sm:text-xl mb-4">
            <span className="text-[#aaacae]">Shipping </span>
            <span className="text-[#fc5d0f]">Address</span>
          </h3>
          <input
            type="text"
            name="buyerName"
            placeholder="Full Name"
            required
            className="border border-[#aaacae] px-3 py-2 text-[#aaacae]"
            onChange={(e) => setBuyerName(e.target.value)}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            className="border border-[#aaacae] px-3 py-2 text-[#aaacae]"
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            name="street"
            placeholder="Address"
            rows="8"
            required
            className="resize-none border border-[#aaacae] px-3 py-2 text-[#aaacae]"
            onChange={(e) => setStreet(e.target.value)}
          />
          <div className="flex gap-3">
            <input
              type="text"
              name="postcode"
              placeholder="Postcode"
              required
              className="border border-[#aaacae] px-3 py-2 text-[#aaacae] flex-1 w-1/2"
              onChange={(e) => setPostcode(e.target.value)}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              required
              className="border border-[#aaacae] px-3 py-2 text-[#aaacae] flex-1 w-1/2"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        {/* Payment */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-medium max-sm:text-xl mt-8 mb-4">
            <span className="text-[#aaacae]">Payment </span>
            <span className="text-[#fc5d0f]">Details</span>
          </h3>
          <input
            type="text"
            placeholder="Card Number"
            className="border border-[#aaacae] px-3 py-2 text-[#aaacae]"
            required
          />
          <div className="flex mt-1 text-[#aaacae] gap-8">
            <div className="flex flex-col">
              <h5 className="mb-1">Expiry date</h5>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="mm"
                  className="border border-[#aaacae] px-1 py-2 max-w-11 text-center"
                  required
                />
                <span className="mx-1">/</span>
                <input
                  type="text"
                  placeholder="yy"
                  className="border border-[#aaacae] px-1 py-2 max-w-11 text-center"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col text-[#aaacae]">
              <h5 className="mb-1">Security Code</h5>
              <input
                type="text"
                placeholder="Security Code"
                className="border border-[#aaacae] px-1 py-2 max-w-31"
              />
            </div>
          </div>
        </div>
        <button
          className="w-full py-3 mt-12 bg-[#fc5d0f] cursor-pointer text-white"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default page;
