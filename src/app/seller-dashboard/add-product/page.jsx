"use client";

import Image from "next/image";
import { useState } from "react";

function page() {
  const [image, setImage] = useState(false);
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

  return (
    <div className="flex flex-col items-center mt-8 ">
      <h3 className="font-bold text-2xl">ADD PRODUCT</h3>
      <form className="flex flex-col w-full mt-5 items-start">
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
          hidden
          required
          onChange={(e) => imageUploadHandler(e)}
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
                className="border p-1"
                onChange={(e) => onChangeHandler(e)}
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
                className="border max-w-25 p-1 "
                placeholder="0"
                onChange={(e) => onChangeHandler(e)}
                required
              />
            </div>
          </div>
        </div>
        <button className="mt-5 py-1 px-3 cursor-pointer bg-black text-white dark:bg-white dark:text-black">
          ADD
        </button>
      </form>
    </div>
  );
}

export default page;
