import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

function ProductCom({
  category,
  sellerMongoId,
  name,
  image,
  price,
  productId,
  fetchProductData,
}) {
  async function handleDelete() {
    const res = await axios.delete("/api/seller/getProduct", {
      params: {
        productId,
      },
    });
    if (res.data.success) {
      toast.success(res.data.msg);
      fetchProductData();
    } else {
      toast.error(res.data.msg);
    }
  }
  return (
    <div className="flex h-full md:px-4 px-2 py-3 gap-4 bg-gray-100 rounded-lg dark:bg-[#0f0f0f] dark:text-gray-200 transition-colors duration-300">
      <div className="rounded-lg overflow-hidden min-w-[120px] min-h-[157px] sm:hidden block">
        <Image
          src={image}
          width={120}
          height={210}
          alt="dog food 1"
          className="h-full"
        />
      </div>
      <div className="rounded-lg overflow-hidden min-w-[180px] min-h-[157px] hidden sm:block">
        <Image
          src={image}
          width={180}
          height={210}
          alt="dog food 1"
          className="h-full"
        />
      </div>
      <div className="flex flex-col justify-between gap-2 py-3">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-[#ff7631] text-white text-xs rounded-4xl">
            {category}
          </span>
          <p className="line-clamp-1 sm:line-clamp-2">{name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold">£{price}</p>
          <div className="flex gap-2 ">
            <button className="px-3 py-1 rounded-sm bg-[#ff7631] cursor-pointer">
              View
            </button>
            <button
              className="px-3 py-1 rounded-sm bg-[#ff7631] cursor-pointer"
              onClick={handleDelete}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCom;
