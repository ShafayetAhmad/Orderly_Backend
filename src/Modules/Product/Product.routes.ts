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
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: err,
    });
  }
});

productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: err,
    });
  }
});

productsRouter.get("/:productId", async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Respond with the product data
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err,
    });
  }
});

export default productsRouter;
