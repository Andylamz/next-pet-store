import Image from "next/image";
import Link from "next/link";

function ProductCard({
  fixedSize,
  name,
  description,
  image,
  price,
  productId,
}) {
  return (
    <Link
      href={`/product/${productId}`}
      className={`flex flex-col group ${
        fixedSize ? "max-w-[350px]" : ""
      } h-[468px] border border-[#aaacae] p-4 items-center`}
    >
      <div className="overflow-hidden">
        <Image
          src={image}
          width={280}
          height={80}
          alt=""
          className="group-hover:scale-105 transition-all duration-200"
        />
      </div>
      <div className="flex flex-col mt-3">
        <h3 className="font-semibold h-12 line-clamp-2">{name}</h3>
        <p className="line-clamp-2 text-[#aaacae] text-sm mt-2 mb-3">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span>£{price}</span>
          <button className="px-5 py-2 border border-[#aaacae] rounded-2xl text-[#aaacae] text-xs hover:text-white hover:bg-[#aaacae] cursor-pointer transition-colors duration-300">
            Detail
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
