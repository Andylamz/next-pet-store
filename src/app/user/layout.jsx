import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await auth();
  if (!user.userId) {
    redirect("/sign-in");
    return null;
  }
  return <div className="min-h-screen">{children}</div>;
}
