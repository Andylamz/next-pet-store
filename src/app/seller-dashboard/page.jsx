import { redirect } from "next/navigation";

function page() {
  redirect("/seller-dashboard/product-list");
  return null;
}

export default page;
