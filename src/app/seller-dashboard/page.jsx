import { redirect } from "next/navigation";

function page() {
  redirect("/seller-dashboard/add-product");
  return null;
}

export default page;
