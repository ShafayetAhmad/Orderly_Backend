import { Request, Response, Router } from "express";
import { productSchema } from "./Product.validation";
import ProductModel from "./Product.model";

const productsRouter = Router();

productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const validatedProduct = productSchema.parse(req.body);
    const productToSave = new ProductModel(validatedProduct);
    await productToSave.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully!",
      data: productToSave,
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default productsRouter;
