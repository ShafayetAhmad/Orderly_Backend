import { Request, Response, Router } from "express";
import OrderModel from "./Order.model";
import { orderSchema } from "./Order.validation";
import ProductModel from "../Product/Product.model";

const orderRoutes = Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const validatedOrder = orderSchema.parse(req.body);
    const { productId, quantity } = req.body;
    const productData = await ProductModel.findById(productId);

    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const productQuantity = productData.inventory.quantity as number;
    const newQuantity = productQuantity - quantity;

    if (newQuantity >= 0) {
      const orderToSave = new OrderModel(validatedOrder);

      await ProductModel.findByIdAndUpdate(productId, {
        $set: {
          "inventory.quantity": newQuantity,
          "inventory.inStock": newQuantity > 0,
        },
      });

      await orderToSave.save();
      res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: orderToSave,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(400).json({
      success: false,
      message: "Failed to create order",
      error: error,
    });
  }
});

orderRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let allOrders, message;
    if (email) {
      allOrders = await OrderModel.find({ email: email });

      if (allOrders.length > 0) {
        message = `Orders fetched successfully for user with email '${email}'!`;
      } else {
        message = `No orders found for user with email '${email}'.`;
      }
    } else {
      allOrders = await OrderModel.find();
      message = "Orders fetched successfully!";
    }
    res.status(200).json({
      success: true,
      message: message,
      data: allOrders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders",
      error: error,
    });
  }
});

export default orderRoutes;
