import { connectDB } from "@/lib/config/ConnectDB";
import CartModel from "@/lib/Models/CartModel";
import { NextResponse } from "next/server";
import ProductModel from "@/lib/Models/Product";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const { buyerMongoId, productId, quantity, isUpdate = false } = body;
  try {
    const buyer = await CartModel.findOne({ buyerMongoId });
    if (!buyer) {
      const newCart = await CartModel.create({
        buyerMongoId,
        items: [{ productId, quantity }],
      });
      return NextResponse.json({
        success: true,
        msg: "Item added to shopping cart",
      });
    }

    if (isUpdate) {
      await CartModel.updateOne(
        { buyerMongoId, "items.productId": productId },
        {
          $set: { "items.$.quantity": quantity },
        }
      );
      return NextResponse.json({ success: true, msg: "Updated Quantity" });
    }

    const existingItem = buyer.items.find(
      (product) => product.productId.toString() === productId
    );
    if (existingItem) {
      await CartModel.updateOne(
        { buyerMongoId, "items.productId": productId },
        { $inc: { "items.$.quantity": quantity } }
      );
      return NextResponse.json({
        success: true,
        msg: "Item added to shopping cart",
      });
    } else {
      await CartModel.updateOne(
        { buyerMongoId },
        { $push: { items: { productId, quantity } } }
      );
      return NextResponse.json({
        success: true,
        msg: "Item added to shopping cart",
      });
    }
  } catch (err) {
    return NextResponse.json({
      success: false,
      msg: err.message,
    });
  }
}

export async function GET(req) {
  const buyerMongoId = req.nextUrl.searchParams.get("buyerMongoId");
  await connectDB();
  try {
    const res = await CartModel.findOne({ buyerMongoId }).populate(
      "items.productId"
    );
    console.log(buyerMongoId);
    return NextResponse.json({ success: true, data: res });
  } catch (err) {
    return NextResponse.json({ success: false, data: err.message });
  }
}

export async function DELETE(req) {
  const productId = req.nextUrl.searchParams.get("productId");
  const buyerMongoId = req.nextUrl.searchParams.get("buyerMongoId");
  try {
    const res = await CartModel.updateOne(
      { buyerMongoId },
      {
        $pull: {
          items: {
            productId,
          },
        },
      }
    );
    return NextResponse.json({ success: true, msg: "Item Deleted" });
  } catch {
    return NextResponse.json({ success: false, msg: "Failed to delete item" });
  }
}
