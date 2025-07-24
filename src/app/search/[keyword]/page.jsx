"use client";
import { useParams } from "next/navigation";

function page({ params }) {
  const { keyword } = useParams();
  return <div>{keyword}</div>;
}

export default page;
