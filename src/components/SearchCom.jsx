import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchCom() {
  return (
    <form className="flex flex-1 justify-center ">
      <input
        type="search"
        className="border border-r-0 border-[#e9e9e9] outline-none text-sm p-2 max-w-[500px]  w-full"
        placeholder="search here..."
      />
      <div className="flex items-center px-3 border border-[#e9e9e9]  cursor-pointer group">
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
