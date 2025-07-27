import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";

export default async function Layout({ children }) {
  const user = await auth();
  if (!user.userId) {
    redirect("/sign-in");
    return null;
  }
  return <>{children}</>;
}
