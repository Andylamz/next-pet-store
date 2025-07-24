import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

function page() {
  const { useId } = auth();
  if (!useId) {
    toast.err("Please sign in!");
    return redirect("/sign-in");
  }
  redirect("/seller-dashboard/add-product");
  return null;
}

export default page;
