import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  cartId: {
    type: String,
    required: true,
  },
  buyerMongoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  buyerName: {
    type: String,
  },
  phone: {
    type: String,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      sellerMongoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
  address: {
    street: { type: String },
    postcode: { type: String },
    city: { type: String },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: { type: String, default: "pending" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel =
  mongoose.models.order || new mongoose.model("order", OrderSchema);
export default OrderModel;
