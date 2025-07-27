"use client";
import Lottie from "lottie-react";
import success from "@/../../public/assets/animation/sucess.json";
import loading from "@/../../public/assets/animation/loading.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
function page() {
  const [firstAnimation, setFirstAnimation] = useState(true);
  const [secondAnimation, setSecondAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (firstAnimation) {
      setTimeout(() => {
        setFirstAnimation(false);
        setSecondAnimation(true);
      }, 4000);
    }
    if (secondAnimation) {
      setTimeout(() => {
        router.push("/user/orders");
      }, 2000);
    }
  });

  return (
    <div className="max-w-[500px] mx-auto mt-50">
      {secondAnimation && <Lottie animationData={success} loop={false} />}
      {firstAnimation && <Lottie animationData={loading} loop={true} />}
    </div>
  );
}

export default page;
