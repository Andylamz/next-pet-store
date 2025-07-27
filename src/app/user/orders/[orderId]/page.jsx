"use client";

import { use } from "react";

function page({ params }) {
  const { orderId } = use(params);
  return <div>{orderId}</div>;
}

export default page;
