import OrderModel from "@/lib/Models/OrderModel";
import { connectDB } from "@/lib/config/ConnectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  const sellerMongoId = req.nextUrl.searchParams.get("sellerMongoId");
  try {
    const res = await OrderModel.find({
      "products.sellerMongoId": sellerMongoId,
    });

    const filteredOrder = res.map((order) => {
      const filteredProduct = order.products.filter((product) => {
        return product.sellerMongoId.toString() === sellerMongoId;
      });
      order.products = filteredProduct;
      return order;
    });

    return NextResponse.json({ success: true, data: filteredOrder });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}

export async function PATCH(req) {
  await connectDB();
  const body = await req.json();
  const { tracking, orderId, sellerMongoId } = body;

  try {
    const res = await OrderModel.findOneAndUpdate(
      { _id: orderId },
      {
        $set: {
          "products.$[elem].tracking": tracking,
          status: "shipped",
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem.sellerMongoId": sellerMongoId }],
      }
    );
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}
