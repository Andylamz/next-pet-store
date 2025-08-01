"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

function page() {
  const [image, setImage] = useState(false);
  const { user } = useUser();

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "dogs",
    price: "",
  });

  function imageUploadHandler(e) {
    setImage(e.target.files[0]);
  }

  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("image", image);
    formData.append("mongoId", user.publicMetadata.mongoId);

    const res = await axios.post("/api/addProduct", formData);

    if (res.data.success) {
      toast.success(res.data.msg);
      setImage(false);
      setData({
        name: "",
        description: "",
        category: "dogs",
        price: "",
      });
    } else {
      return toast.error(res.data.msg);
    }
  }
  return (
    <div className="flex flex-col items-center mt-8 ">
      <h3 className="font-bold text-2xl">ADD PRODUCT</h3>
      <form
        className="flex flex-col w-full mt-5 items-start"
        onSubmit={onSubmitHandler}
      >
        <p className="font-semibold">Product Image</p>
        <label className="mt-3 cursor-pointer" htmlFor="image">
          <Image
            src={!image ? "/assets/upload.png" : URL.createObjectURL(image)}
            width={350}
            height={150}
            alt="upload image"
          />
        </label>
        <input
          type="file"
          id="image"
          name="image"
          hidden
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label className="font-semibold mt-3" htmlFor="name">
          Product Name
        </label>
        <input
          type="text"
          className="w-[70%] sm:max-w-[400px] border px-2 py-1 mb-2 "
          name="name"
          id="name"
          onChange={(e) => onChangeHandler(e)}
          value={data.name}
          placeholder="Type here..."
          required
        />
        <label className="font-semibold mt-3" htmlFor="description">
          Product Description
        </label>
        <textarea
          name="description"
          value={data.description}
          rows={10}
          type="text"
          id="description"
          className="border w-[80%] sm:max-w-[500px] px-2 py-1 mb-2 resize-none"
          placeholder="Type here..."
          onChange={(e) => onChangeHandler(e)}
          required
        />
        <div className="w-[80%] sm:max-w-[500px] mt-3">
          <div className="w-full flex  sm:gap-10 gap-3 ">
            <div className="flex flex-col text-center">
              <label htmlFor="" className="mb-1">
                Category
              </label>
              <select
                className="border p-1 h-[33.79px]"
                onChange={(e) => onChangeHandler(e)}
                name="category"
                value={data.category}
              >
                <option value="dogs">Dogs</option>
                <option value="cats">Cats</option>
                <option value="other">Others</option>
              </select>
            </div>
            <div className="flex  flex-col text-center">
              <label htmlFor="" className="mb-1">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={data.price}
                className="border max-w-25 p-1 "
                placeholder="0"
                onChange={(e) => onChangeHandler(e)}
                required
              />
            </div>
          </div>
        </div>
        <button className="mt-5 py-1 px-5 cursor-pointer bg-black text-white dark:bg-white dark:text-black">
          ADD
        </button>
      </form>
    </div>
  );
}

export default page;
