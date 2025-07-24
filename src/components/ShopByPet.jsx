import Image from "next/image";
import Link from "next/link";

function ShopByPet() {
  return (
    <div className="mt-24">
      <div className="flex items-center mb-12 justify-between">
        <h3 className="font-semibold text-3xl  max-lg:text-center">
          Shop By Pet
        </h3>
        <Link
          href="/all-products"
          className="hover:text-[#fc5d0f] transition-colors duration-300 max-sm:text-sm"
        >
          All products
        </Link>
      </div>
      <div className="flex max-lg:flex-wrap justify-evenly gap-9">
        <Link
          href="/"
          className="h-[433px] overflow-hidden rounded-3xl max-w-[600px] sm:min-w-[445px] min-w-75 flex-1 lg:hover:-translate-y-5 transition-all duration-800"
        >
          <Image
            src="/assets/dog_and_cat/dog.jpg"
            width={650}
            height={450}
            alt="dog picture"
            className="object-cover w-full h-full"
          />
        </Link>

        <Link
          href="/"
          className="h-[433px] overflow-hidden rounded-3xl max-w-[600px] sm:min-w-[445px] min-w-75 flex-1 lg:hover:-translate-y-5 transition-all duration-800"
        >
          <Image
            src="/assets/dog_and_cat/cat.jpg"
            width={650}
            height={450}
            alt="cat picture"
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default ShopByPet;
