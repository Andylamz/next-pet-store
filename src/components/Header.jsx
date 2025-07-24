"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faTableColumns,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import BecomeSellerBtn from "../components/BecomeSellerBtn";
import SearchCom from "./SearchCom";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function Header() {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  const isSeller = user?.publicMetadata.role === "seller" ? true : false;
  const pathName = usePathname();

  if (["/sign-in", "/sign-up"].includes(pathName)) {
    console.log(pathName);
    return null;
  }
  function handleSearchOpen(boolean) {
    setSearchIsOpen(boolean);
  }
  function handleMenuOpen(boolean) {
    setMenuIsOpen(boolean);
  }

  return (
    // px-30 --xl
    <div className="flex sticky top-0 z-10 items-center justify-between xl:px-35 md:px-10 sm:px-2 px-4 py-5 gap-4 w-full duration-500  bg-white dark:bg-[#272727]">
      <Link href="/">
        <Image
          src="/logo.png"
          width={120}
          height={80}
          alt="Andy Pet Store Logo"
        />
      </Link>
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
          <BecomeSellerBtn />
          <SignedIn>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<FontAwesomeIcon icon={faCartShopping} />}
                  onClick={() => router.push("/user/cart")}
                />
                <UserButton.Action
                  label="Orders"
                  labelIcon={<FontAwesomeIcon icon={faBagShopping} />}
                  onClick={() => router.push("/user/orders")}
                />
                {isSeller ? (
                  <UserButton.Action
                    label="Seller Dashboard"
                    labelIcon={<FontAwesomeIcon icon={faTableColumns} />}
                    onClick={() => router.push("/seller-dashboard")}
                  />
                ) : null}
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
                onClick={() => router.push("/user/cart")}
              />
              <UserButton.Action
                label="orders"
                labelIcon={<FontAwesomeIcon icon={faBagShopping} />}
                onClick={() => router.push("/user/orders")}
              />
              {isSeller ? (
                <UserButton.Action
                  label="Seller Dashboard"
                  labelIcon={<FontAwesomeIcon icon={faTableColumns} />}
                  onClick={() => router.push("/seller-dashboard")}
                />
              ) : (
                <UserButton.Action
                  label="Seller Dashboard"
                  labelIcon={<FontAwesomeIcon icon={faTableColumns} />}
                  onClick={() => router.push("/login")}
                />
              )}
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
        className={`flex items-center dark:bg-black bg-white absolute left-0 top-0 transition-all duration-500 overflow-hidden h-full md:hidden ${
          searchIsOpen ? " px-5 w-full" : " w-0 px-0"
        } `}
      >
        <div className="flex items-center gap-6 w-full">
          <SearchCom handleSearchOpen={handleSearchOpen} />
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
        className={`flex items-center dark:bg-black bg-white absolute left-0 top-0 transition-all duration-500 overflow-hidden h-full md:hidden ${
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
          <div onClick={() => handleMenuOpen(false)}>
            <BecomeSellerBtn />
          </div>
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
