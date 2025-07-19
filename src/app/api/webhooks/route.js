import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt?.data;
    const eventType = evt?.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (eventType === "user.created" || eventType === "user.updated") {
      const { first_name, last_name, image_url, email_addresses } = evt.data;
      try {
        const user = await createOrUpdateUser(
          id,
          first_name,
          last_name,
          image_url,
          email_addresses
        );
        if (user && eventType === "user.created") {
          try {
            await clerkClient.user.updateUserMetadata(id, {
              publicMetadata: {
                mongoId: user._id,
              },
            });
            return NextResponse.json({
              success: true,
              msg: "user metadata created",
            });
          } catch {
            console.log("Error on setting up metadata");
            return NextResponse.json({
              success: false,
              msg: "Cannot create user metadata",
            });
          }
        }
        return NextResponse.json({
          success: true,
          msg: "User created or updated successfully",
        });
      } catch (err) {
        console.log("Error on creating or updating user");
        return NextResponse.json({
          success: false,
          msg: "User created or updated unsuccessfully",
        });
      }
    }

    if (eventType === "user.deleted") {
      try {
        await deleteUser(id);
        return NextResponse.json({ success: true, msg: "User Deleted" });
      } catch {
        console.log("Could not delete user");
        return NextResponse.json({
          success: false,
          msg: "Failed to delete user",
        });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
