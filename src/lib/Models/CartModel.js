import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  buyerMongoId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const CartModel =
  mongoose.models.cart || new mongoose.model("cart", CartSchema);

export default CartModel;
