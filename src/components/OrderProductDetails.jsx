import Image from "next/image";

function OrderProductDetails({ product }) {
  const totalPrice = (product.price * product.quantity).toFixed(2);
  return (
    <div className=" flex max-sm:text-sm">
      <div className="flex gap-2">
        {/* Image */}
        <div className="min-w-[180px] rounded-lg overflow-hidden sm:block hidden mb-3">
          <Image
            src={product.image}
            width={180}
            height={120}
            alt=""
            className="min-h-full"
          />
        </div>
        <div className="min-w-[120px] rounded-lg overflow-hidden sm:hidden block mb-3 ">
          <Image
            src={product.image}
            width={120}
            height={120}
            alt=""
            className="h-full"
          />
        </div>

        {/* Details */}
        <div className="md:py-5 py-3 flex flex-col justify-between ml-3">
          <div>
            <p className="line-clamp-1">{product.name}</p>
            <p
              className={`${product.tracking ? "text-[14px]" : "text-[10px]"}`}
            >
              {product?.tracking
                ? `Tracking Number: ${product?.tracking}`
                : "(Awaiting shipment)"}
            </p>
          </div>
          <div>
            <p>Quantity: {product.quantity}</p>
            <p>Total Price: £{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderProductDetails;
