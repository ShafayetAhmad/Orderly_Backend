import { model, Schema } from "mongoose";
import Order from "./Order.interface";

const orderSchema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export default model<Order>("Order", orderSchema);
