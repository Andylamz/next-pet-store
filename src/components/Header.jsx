"use client";

import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SearchCom from "./SearchCom";
import { useEffect, useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function Header() {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  function handleSearchOpen(boolean) {
    setSearchIsOpen(boolean);
  }
  function handleMenuOpen(boolean) {
    setMenuIsOpen(boolean);
  }

  return (
    // px-30 --xl
    <div className="flex relative items-center justify-between xl:px-35 md:px-10 sm:px-2 px-4 py-5 border-b-2 border-[#e9e9e9] gap-4 w-full ">
      <div>
        <Image
          src="/logo.png"
          width={120}
          height={80}
          alt="Andy Pet Store Logo"
        />
      </div>
      <div className="flex-1 hidden sm:block items-center  ">
        <SearchCom />
      </div>
      <div className="hidden sm:block">
        <div className="flex gap-4 text-md items-center">
          <Link
            href="/"
            className="hover:text-[#fc5d0f] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            className="hover:text-[#fc5d0f] transition-colors duration-300"
            href="/about"
          >
            About
          </Link>
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<FontAwesomeIcon icon={faCartShopping} />}
                  onClick={() => router.push("/")}
                />
                <UserButton.Action
                  label="orders"
                  labelIcon={<FontAwesomeIcon icon={faBagShopping} />}
                  onClick={() => router.push("/orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <FontAwesomeIcon
                icon={faUser}
                className="cursor-pointer hover:text-[#fc5d0f] transition-colors duration-300 "
                size="md"
              />
            </Link>
          </SignedOut>
        </div>
      </div>

      {/*  ------------------------- mobile - small screens  ---------------------------------- */}
      <div className="flex gap-5 sm:hidden pr-5 items-center">
        <FontAwesomeIcon
          size="lg"
          className="cursor-pointer"
          icon={faMagnifyingGlass}
          onClick={() => handleSearchOpen(true)}
        />
        <FontAwesomeIcon
          size="lg"
          onClick={() => handleMenuOpen(true)}
          className="cursor-pointer"
          icon={faBars}
        />
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Cart"
                labelIcon={<FontAwesomeIcon icon={faCartShopping} />}
                onClick={() => router.push("/cart")}
              />
              <UserButton.Action
                label="orders"
                labelIcon={<FontAwesomeIcon icon={faBagShopping} />}
                onClick={() => router.push("/orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <FontAwesomeIcon
              icon={faUser}
              className="cursor-pointer hover:text-[#fc5d0f] transition-colors duration-300 "
              size="md"
            />
          </Link>
        </SignedOut>
      </div>

      {/* Search bar - mobile */}
      <div
        className={`flex items-center dark:bg-black bg-white absolute left-0 top-0 transition-all duration-500 overflow-hidden h-full ${
          searchIsOpen ? " px-5 w-full" : " w-0 px-0"
        } `}
      >
        <div className="flex items-center gap-6 w-full">
          <SearchCom />
          <span
            className="px-1 cursor-pointer text-red-500"
            onClick={() => handleSearchOpen(false)}
          >
            x
          </span>
        </div>
      </div>

      {/* Menu bar - mobile */}
      <div
        className={`flex items-center dark:bg-black bg-white absolute left-0 top-0 transition-all duration-500 overflow-hidden h-full ${
          menuIsOpen ? " px-5 w-full" : " w-0 px-0"
        } `}
      >
        <div className="flex items-center justify-center gap-8 w-full">
          <Link href="/" onClick={() => handleMenuOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => handleMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" onClick={() => handleMenuOpen(false)}>
            Contact
          </Link>
          <span
            className="px-1 cursor-pointer text-red-500"
            onClick={() => handleMenuOpen(false)}
          >
            x
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
