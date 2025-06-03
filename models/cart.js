import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    cartId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
    },
    guestId: {
      type: String,
    },
    products: [
      {
        prodId: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
