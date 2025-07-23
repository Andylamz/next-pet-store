import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function Footer() {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 max-w-screen bg-black pt-5 pb-15 items-center px-5 mt-20">
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
      <p className="text-sm text-white">© All Rights Reserved | Andy YT Lam </p>
    </div>
  );
}

export default Footer;
