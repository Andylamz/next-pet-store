import { connectDB } from "@/lib/config/ConnectDB";
import ProductModel from "@/lib/Models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const res = await ProductModel.find();
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: null });
  }
}
