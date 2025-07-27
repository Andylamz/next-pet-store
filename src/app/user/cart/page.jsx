"use client";
import CarttableItem from "@/components/user/CarttableItem";
import OrderSummary from "@/components/user/OrderSummary";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function page() {
  const [cart, setCart] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [isPromo, setIsPromo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cartId, setCartId] = useState("");
  const code = useRef();
  const promoCode = process.env.NEXT_PUBLIC_PROMO_CODE;
  const user = useUser();
  const buyerMongoId = user?.user?.publicMetadata?.mongoId;

  const router = useRouter();
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.quantity * item.productId.price;
  }, 0);
  let discount = (Number(totalPrice) * 0.1).toFixed(2);
  const finalPrice = isPromo
    ? (totalPrice - discount).toFixed(2)
    : totalPrice.toFixed(2);

  async function handleGetCartData() {
    try {
      const res = await axios.get("/api/cartInfo", {
        params: {
          buyerMongoId,
        },
      });
      console.log("cart=>", res.data);
      if (res.data.success) {
        setCart(res.data.data?.items || []);
        setCartId(res.data.data._id);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  function handlePromoCode(e) {
    e.preventDefault();
    if (promoCode === code.current.value) {
      setIsPromo(true);
      code.current.value = "";
      toast.success("Promo Code Applied");
    } else {
      toast.error("Invalid Promo Code");
      code.current.value = "";
    }
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    const order = {
      buyerMongoId,
      totalPrice: finalPrice,
      products: cart.map((item) => ({
        productId: item.productId._id,
        sellerMongoId: item.productId.sellerMongoId,
        quantity: item.quantity,
        price: item.productId.price,
        cartId,
      })),
    };
    const res = await axios.post("/api/placeOrder", order);
    // return order Id
    if (res.data.success) {
      const orderId = res.data.data._id;
      return router.push(`/user/checkout?orderId=${orderId}`);
    } else {
      return console.log("failed");
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (!isFetched && buyerMongoId) {
      handleGetCartData();
      setIsFetched(true);
    }
    setIsLoading(false);
  }, [user]);

  return (
    <div className="flex lg:flex-row flex-col xl:px-35 md:px-10 px-4 gap-10 mt-8">
      <div className="flex-5">
        {/* Left Header */}
        <div className="flex justify-between items-center py-4 px-1 border-b-2 border-[#aaacae] ">
          <h3 className="text-3xl font-medium max-sm:text-2xl">
            <span className="text-[#aaacae]">Shopping </span>
            <span className="text-[#fc5d0f]">Cart</span>
          </h3>
          <div className="text-[#aaacae]">
            {cart && cart.reduce((acc, curr) => acc + Number(curr.quantity), 0)}
            {" items"}
          </div>
        </div>
        {/* Left Table */}
        <table className=" w-full text-left">
          {/* table header */}
          <thead>
            <tr>
              <th className="py-5 px-2 font-thin">
                <div>Products</div>
              </th>
              <th className="py-5 px-2 font-thin">Quantity</th>
              <th className="py-5 px-2 font-thin">Price</th>
            </tr>
          </thead>
          {/* table body - components */}
          <tbody className="max-h-[600px] overflow-y-auto">
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                <CarttableItem
                  key={item._id}
                  image={item.productId.image}
                  name={item.productId.name}
                  price={item.productId.price}
                  productId={item.productId._id}
                  quantity={item.quantity}
                  setCart={setCart}
                  handleGetCartData={handleGetCartData}
                  buyerMongoId={buyerMongoId}
                />
              ))}
            {cart && cart.length < 1 && (
              <tr className="mt-8">
                <td></td>
                <td>
                  <div className=" mt-10 text-[#aaacae] py-25">Empty Cart</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Order Summary - right */}
      <div className="flex flex-col flex-3 bg-[#f8f8f8] text-black py-4 px-8">
        <div>
          <h3 className="text-2xl font-medium border-b border-[#aaacae] py-3 my-5 max-sm:text-xl">
            Order Summary
          </h3>
          <div className="border-b border-[#aaacae] pb-3 mb-5">
            {cart &&
              cart.length > 0 &&
              cart.map((item) => (
                <OrderSummary
                  key={item._id}
                  name={item.productId.name}
                  quantity={item.quantity}
                />
              ))}
            {cart && !cart.length && (
              <div className="my-10 text-center">Empty Cart</div>
            )}
          </div>
          <div className="border-b border-[#aaacae] pb-5">
            <h3 className="text-lg">Promo Code</h3>
            <form
              className="flex mt-2 gap-5 max-sm:flex-col "
              onSubmit={(e) => handlePromoCode(e)}
            >
              <input
                input="text"
                placeholder="Enter promo code"
                className="flex-3 bg-white p-2"
                ref={code}
              />
              <button className="flex-1 bg-[#fc5d0f] text-white cursor-pointer py-2">
                Apply
              </button>
            </form>
          </div>
          {/* Total */}
          <div className="mt-5">
            <div className="text-[#aaacae]">
              <div className="flex justify-between py-1">
                <p>
                  {cart &&
                    cart.reduce((acc, curr) => acc + Number(curr.quantity), 0)}
                  {" Items"} (included VAT)
                </p>
                <p className="font-semibold">£{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between py-1">
                <p>Shipping fee</p>
                <p className="font-semibold">Free</p>
              </div>
              {isPromo && (
                <div className="flex justify-between py-1">
                  <p>Promo code (-10%)</p>
                  <p className="font-semibold">- £{discount}</p>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4 items-center">
              <p className="text-2xl font-semibold">Total</p>
              <p className="text-xl font-semibold">£{finalPrice}</p>
            </div>

            <div className="mt-5">
              <button
                className="w-full py-3 mb-4 bg-[#fc5d0f] cursor-pointer text-white"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
