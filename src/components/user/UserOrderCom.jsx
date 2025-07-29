import Image from "next/image";
import Link from "next/link";

function UserOrderCom({
  buyerMongoId,
  createdAt,
  products,
  totalPrice,
  orderId,
  image,
  status,
  name,
}) {
  //`/user/checkout?orderId=${orderId}`
  const dateString = new Date(createdAt);
  const date = dateString.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={
        status === "pending"
          ? `/user/checkout?orderId=${orderId}`
          : `/user/orders/${orderId}`
      }
      className="flex rounded-lg dark:bg-[#0f0f0f] dark:text-gray-200 transition-all duration-800 px-4 py-3 gap-4 lg:hover:translate-x-10 cursor-pointer max-sm:text-xs "
    >
      {/* left */}
      <div className="min-w-30 rounded-lg overflow-hidden sm:block hidden">
        <Image src={image} width={180} height={120} alt="" className="h-full" />
      </div>
      <div className="min-w-25 rounded-lg overflow-hidden sm:hidden block">
        <Image src={image} width={120} height={120} alt="" className="h-full" />
      </div>

      {/* right */}
      <div className="flex flex-col justify-between">
        <div className="sm:pt-2">
          <p className="max-w-[470px] line-clamp-2 overflow-ellipsis max-sm:line-clamp-1">
            {name}
          </p>
          <p className="max-sm:text-[10px] text-[#aaaace] text-sm sm:mb-2 my-1">
            {products.length > 1 ? `[${products.length - 1} more]` : ""}
          </p>
        </div>
        <div className="sm:mb-2">
          <p className="font-semibold">£{totalPrice.toFixed(2)}</p>
          <p
            className={`text-sm max-sm:text-[10px] ${
              status === "pending" ? "text-red-400" : ""
            }`}
          >
            status: {status} {status === "pending" ? "(Click to pay now)" : ""}
          </p>
          <p className="max-sm:text-[10px] text-sm">Order Placed: {date}</p>
        </div>
      </div>
    </Link>
  );
}

export default UserOrderCom;
