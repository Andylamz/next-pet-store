"use client";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

function SearchCom({ handleSearchOpen }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmitQuery(e) {
    e.preventDefault();
    if (query.trim() !== "") {
      router.push(`/search/${query}`);
      handleSearchOpen(false);
      return setQuery("");
    } else {
      toast.error("Search field cannot be empty");
    }
  }
  return (
    <form className="flex flex-1 justify-center" onSubmit={handleSubmitQuery}>
      <input
        type="search"
        className="border border-r-0 border-[#e9e9e9] outline-none text-sm p-2 max-w-[500px]  w-full"
        placeholder="search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div
        className="flex items-center px-3 border border-[#e9e9e9] cursor-pointer group "
        onClick={handleSubmitQuery}
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="sm"
          className="group-hover:text-[#fc5d0f] transition-colors duration-300 text-[#c8c8c8]"
        />
      </div>
    </form>
  );
}

export default SearchCom;
