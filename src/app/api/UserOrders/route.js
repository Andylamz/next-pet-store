import { connectDB } from "@/lib/config/ConnectDB";
import OrderModel from "@/lib/Models/OrderModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const buyerMongoId = req.nextUrl.searchParams.get("buyerMongoId");
  console.log(buyerMongoId);
  try {
    const res = await OrderModel.find({ buyerMongoId });
    return NextResponse.json({ success: true, data: res });
  } catch {
    return NextResponse.json({ success: false, data: null });
  }
}
