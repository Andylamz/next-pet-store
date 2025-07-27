import { connectDB } from "@/lib/config/ConnectDB";
import OrderModel from "@/lib/Models/OrderModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { buyerMongoId, totalPrice, products, cartId } = body;
  console.log(cartId);
  try {
    const res = await OrderModel.create({
      buyerMongoId,
      totalPrice,
      products,
      cartId,
    });
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}

export async function PATCH(req) {
  await connectDB();
  const body = await req.json();
  const { address, phone, buyerName, orderId, status } = body;

  try {
    const res = await OrderModel.findByIdAndUpdate(orderId, {
      address,
      phone,
      buyerName,
      status,
    });
    console.log(res);
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}
