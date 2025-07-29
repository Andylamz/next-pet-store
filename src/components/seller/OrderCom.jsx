import Image from "next/image";
import Link from "next/link";

function OrderCom({ data }) {
  const { products } = data;
  const id = data._id;

  const totalUIPrice = products?.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
  const dateString = new Date(data.createdAt);
  const date = dateString.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (data.status === "pending") {
    return null;
  }
  console.log(data);
  return (
    <Link
      href={`/seller-dashboard/orders/${id}`}
      className="flex my-3 w-full h-full mx-auto md:px-4 px-2 py-3 gap-4 cursor-pointer bg-gray-100 rounded-lg dark:bg-[#0f0f0f] dark:text-gray-200 transition-all duration-800 lg:hover:translate-x-10"
    >
      <div>
        <div
          href={`/product`}
          className="rounded-lg overflow-hidden min-w-[120px] min-h-[157px] sm:hidden block h-full"
        >
          <Image
            src={data.products[0].image}
            width={120}
            height={210}
            alt="dog food 1"
            className="h-full"
          />
        </div>
        <div
          href={`/product`}
          className="rounded-lg overflow-hidden min-w-[180px] min-h-[157px] hidden sm:block h-full"
        >
          <Image
            src={data.products[0].image}
            width={180}
            height={210}
            alt="dog food 1"
            className="h-full"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between py-2 max-sm:text-sm">
        <div className="">
          <p>{data.products[0].name}</p>
          <p className="max-sm:text-[10px] text-[#aaaace] text-sm sm:mb-2 my-1">
            {data.products.length > 1
              ? `[and ${data.products.length - 1} more]`
              : ""}
          </p>
        </div>
        <div>
          <div className="font-semibold">£ {totalUIPrice.toFixed(2)}</div>
          <div className="text-sm max-sm:text-[10px]">
            status: {data.status}
          </div>
          <div className="max-sm:text-[10px] text-sm">Order Placed: {date}</div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCom;
