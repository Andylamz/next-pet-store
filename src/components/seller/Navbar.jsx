import Link from "next/link";

function Navbar() {
  return (
    <>
      <div className="font-bold py-3 px-2 hidden sm:block select-none">
        Seller Dashboard
      </div>
      <Link
        href="/admin/add-product"
        className=" py-3 px-2 hover:bg-[#272727] rounded-md transition-colors duration-300"
      >
        Add Product
      </Link>
      <Link
        href="/admin/product-list"
        className=" py-3 px-2 hover:bg-[#272727] rounded-md transition-colors duration-300"
      >
        Product List
      </Link>
      <Link
        href="/admin/orders"
        className=" py-3 px-2 hover:bg-[#272727] rounded-md transition-colors duration-300"
      >
        Orders
      </Link>
    </>
  );
}

export default Navbar;
