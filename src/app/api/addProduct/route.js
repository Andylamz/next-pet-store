import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/config/ConnectDB";
import ProductModel from "@/lib/Models/Product";
import { NextResponse } from "next/server";

async function uploadToCloudinary(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
      .end(buffer);
  });
}

export async function POST(req) {
  const formData = await req.formData();
  const timestamp = new Date.now();

  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.get("price");
  const image = formData.get("image");
  const mongoId = formData.get("mongoId");

  if (!image) {
    return NextResponse.json({ success: false, msg: "No Image Added" });
  }
  try {
    await connectDB();
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const uploadImage = await uploadToCloudinary(buffer, "product");
    const productData = {
      name,
      description,
      category,
      price: +price,
      mongoId,
      image: uploadImage.secure_url,
    };

    const res = await ProductModel.create(productData);

    return NextResponse.json({ success: true, msg: "Product Added" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: err.message });
  }
}
