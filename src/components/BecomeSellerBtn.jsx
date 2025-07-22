"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function BecomeSellerBtn() {
  const { user } = useUser();
  const router = useRouter();

  async function becomeSeller() {
    const res = await axios.post("/api/become-seller");
    if (res.data.success) {
      toast.success(res.data.msg);
    } else {
      toast.error(res.data.msg);
    }
  }
  if (user?.publicMetadata?.role === "seller") return null;
  return (
    <div
      onClick={becomeSeller}
      className="md:hover:text-[#fc5d0f] transition-colors duration-300 "
    >
      <button className="cursor-pointer">Become Seller</button>
    </div>
  );
}

export default BecomeSellerBtn;
