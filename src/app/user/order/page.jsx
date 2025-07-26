"use client";
import Lottie from "lottie-react";
import success from "@/../../public/assets/animation/sucess.json";
function page() {
  return (
    <div className="max-w-[500px]">
      <Lottie animationData={success} loop={false} />
    </div>
  );
}

export default page;
