import { connectDB } from "@/lib/config/ConnectDB";
import OrderModel from "@/lib/Models/OrderModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const isDetails = req.nextUrl.searchParams.get("isDetails");
  if (isDetails === "true") {
    try {
      const orderId = req.nextUrl.searchParams.get("orderId");
      const res = await OrderModel.findById(orderId);
      return NextResponse.json({ success: true, data: res });
    } catch {
      return NextResponse.json({ success: false, data: null });
    }
  }
  try {
    const buyerMongoId = await req.nextUrl.searchParams.get("buyerMongoId");
    const res = await OrderModel.find({ buyerMongoId });
    return NextResponse.json({ success: true, data: res });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
