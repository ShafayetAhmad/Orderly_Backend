import { Request, Response, Router } from "express";
import OrderModel from "./Order.model";
import { orderSchema } from "./Order.validation";

const orderRoutes = Router();

orderRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const validatedOrders = orderSchema.parse(req.body);
    const orderToSave = new OrderModel(validatedOrders);
    await orderToSave.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: orderToSave,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error,
    });
  }
});

orderRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let allOrders, message;
    if (email) {
      allOrders = await OrderModel.find({
        email: email,
      });

      if (allOrders) {
        message = `Orders fetched successfully for user email!`;
      }
    } else {
      allOrders = await OrderModel.find();
      message = "Products fetched successfully!";
    }
    res.status(200).json({
      success: true,
      message: message,
      data: allOrders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch order",
      error: error,
    });
  }
});

export default orderRoutes;
