"use client";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmitEmail() {
    setEmail("");
    toast.success("Signed Up Successfully");
  }
  const path = usePathname();
  if (path.includes("/user/verify")) {
    return null;
  }
  // path = '/' or '/user' or '/sell-dashboard'
  console.log(path);

  return (
    <div className="mt-25 ">
      <div className="flex justify-center flex-wrap min-h-40 bg-[#030712] text-white  items-center gap-2 lg:gap-50  xl:px-35 md:px-10 px-4">
        <div className="flex-1 text-center">
          <p className="font-bold text-xl min-w-[190px]">
            Sign up for 50% off your first order
          </p>
        </div>
        <div className="flex gap-2 flex-1 justify-center items-center ">
          <input
            type="text"
            className="border px-2 py-2 w-full min-w-50 max-w-120"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address Here"
          />
          <button
            className="border px-4 py-2 cursor-pointer whitespace-nowrap"
            onClick={handleSubmitEmail}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="flex justify-around flex-col gap-2 sm:gap-0 max-w-screen bg-black pt-5 pb-15 items-center px-5 ">
        <Image
          src="/logo.png"
          width={120}
          alt="logo"
          height={1}
          className="mb-2 mt-6"
        />
        <div className="flex gap-12 my-5 text-xl">
          <FontAwesomeIcon
            className="cursor-pointer py-2 px-3 hover:text-[#fc5d0f] text-white transition-colors duration-600 focus:outline-1 focus:outline-[#fc5d0f] focus:text-[#fc5d0f]"
            tabIndex={0}
            icon={faFacebookF}
          />
          <FontAwesomeIcon
            className="cursor-pointer p-2 hover:text-[#fc5d0f] text-white transition-colors duration-600 focus:outline-1 focus:outline-[#fc5d0f] focus:text-[#fc5d0f]"
            tabIndex={0}
            icon={faTwitter}
          />
          <FontAwesomeIcon
            className="cursor-pointer p-2 hover:text-[#fc5d0f] text-white transition-colors duration-600 focus:outline-1 focus:outline-[#fc5d0f] focus:text-[#fc5d0f]"
            tabIndex={0}
            icon={faInstagram}
          />
        </div>
        <p className="text-sm text-white">
          © All Rights Reserved | Andy YT Lam{" "}
        </p>
      </div>
    </div>
  );
}

export default Footer;
