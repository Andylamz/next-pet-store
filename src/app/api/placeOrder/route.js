import { connectDB } from "@/lib/config/ConnectDB";
import CartModel from "@/lib/Models/CartModel";
import OrderModel from "@/lib/Models/OrderModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { buyerMongoId, totalPrice, products, cartId, discount } = body;

  try {
    const res = await OrderModel.create({
      discount,
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
    const res = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        address,
        phone,
        buyerName,
        status,
      },
      { new: true }
    );
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}

export async function GET(req) {
  await connectDB();
  const orderId = req.nextUrl.searchParams.get("orderId");

  try {
    const res = await OrderModel.findOne({ _id: orderId });
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}

export async function DELETE(req) {
  await connectDB();
  const body = await req.json();
  const { cartId } = body;

  try {
    const res = await CartModel.findByIdAndDelete(cartId);
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}
