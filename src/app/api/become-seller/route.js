import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = await auth();
    const clerk = clerkClient();
    const user = (await clerk)?.users.getUser(userId);
    const role = (await user)?.publicMetadata.role;

    // if (!userId) {
    // }
    if (role === "seller") {
      return NextResponse.json({
        success: false,
        msg: "You are already a seller",
      });
    }
    (await clerk).users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "seller",
      },
    });
    return NextResponse.json({ success: true, msg: "You are now a seller" });
  } catch {
    return NextResponse.json({ success: false, msg: "Please login" });
  }
}
