import { auth } from "@clerk/nextjs/server";
import Navbar from "../../components/seller/Navbar";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Seller Dashboard",
  icons: { icon: "/Andy_favicon.png" },
  description:
    "The page is the seller dashboard, where sellers can add products, view product list and manage orders",
};

function Layout({ children }) {
  const { useId } = auth();
  if (!useId) {
    return redirect("/sign-in");
  }
  return (
    <>
      <div className="flex justify-center py-3 bg-[#0f0f0f] sm:gap-5 gap-2 xl:px-35 md:px-10 px-4  whitespace-nowrap sm:justify-start text-white">
        <Navbar />
      </div>
      <div className="sm:gap-5 gap-2 xl:px-35 md:px-10 px-4 h-screen">
        {children}
      </div>
    </>
  );
}
export default Layout;
