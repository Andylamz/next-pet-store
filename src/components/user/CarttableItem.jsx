"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

function CarttableItem({
  image,
  name,
  price,
  quantity,
  productId,
  setCart,
  buyerMongoId,
  handleGetCartData,
}) {
  const [number, setNumber] = useState(Number(quantity));
  // Need to return quantity to backend api route
  function handleClickQuantity(action) {
    if (action === "add") {
      setNumber((quantity) => Number(quantity) + 1);
      setCart((items) => {
        return items.map((item) => {
          if (item.productId._id === productId) {
            return { ...item, quantity: Number(item.quantity) + 1 };
          } else {
            return item;
          }
        });
      });
      handleUpdateQuantity(Number(number) + 1);
    }
    if (action === "minus" && number > 1) {
      setNumber((quantity) => Number(quantity) - 1);
      setCart((items) => {
        return items.map((item) => {
          if (item.productId._id === productId) {
            return { ...item, quantity: Number(item.quantity) - 1 };
          } else {
            return item;
          }
        });
      });
      handleUpdateQuantity(Number(number) - 1);
    }
    if (action === "minus" && number <= 1) {
      handleDeleteItem();
      handleGetCartData();
    }
  }

  function handleChangeQuantity(e) {
    if (Number(e.target.value < 1)) {
      handleDeleteItem();
      handleGetCartData();
    }
    setNumber(Number(e.target.value));
    setCart((items) => {
      return items.map((item) => {
        if (item.productId._id === productId) {
          return { ...item, quantity: Number(e.target.value) };
        } else {
          return item;
        }
      });
    });
    handleUpdateQuantity(Number(e.target.value));
  }

  async function handleDeleteItem() {
    const res = await axios.delete("/api/cartInfo", {
      params: {
        productId,
        buyerMongoId,
      },
    });
    if (res.data.success) {
      toast.success(res.data.msg);
    } else {
      toast.error(res.data.msg);
    }
  }

  async function handleUpdateQuantity(enteredQuantity) {
    const res = await axios.post("/api/cartInfo", {
      buyerMongoId,
      productId,
      quantity: enteredQuantity,
      isUpdate: true,
    });

    if (res.data.success) {
      console.log("succeed");
    }
  }

  return (
    <tr className="2">
      <td className="px-2 py-4 flex gap-5 items-center max-w-[400px] text-sm">
        <Image src={image} width={80} height={30} alt="" />
        <p className="line-clamp- 2 overflow-ellipsis sm:block hidden">
          {name}
        </p>
      </td>

      <td className="px-2 py-4 text-sm gap-1 whitespace-nowrap">
        <button
          className="p-1 cursor-pointer"
          onClick={() => handleClickQuantity("minus")}
        >
          -
        </button>
        <input
          type="text"
          size={1}
          value={number}
          className="text-center"
          onChange={(e) => handleChangeQuantity(e)}
        />
        <button
          className="p-1 cursor-pointer"
          onClick={() => handleClickQuantity("add")}
        >
          +
        </button>
      </td>

      <td className="px-2 py-4 text-sm ">£{(number * price).toFixed(2)}</td>
    </tr>
  );
}

export default CarttableItem;
