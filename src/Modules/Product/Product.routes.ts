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
    console.error("Failed to create product:", err); 
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: err,
    });
  }
});

productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let products, message;
    if (searchTerm) {
      products = await ProductModel.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
          { tags: { $regex: searchTerm, $options: "i" } },
        ],
      });

      if (products.length > 0) {
        message = `Products matching search term '${searchTerm}' fetched successfully!`;
      } else {
        message = `No products found matching search term '${searchTerm}'.`;
      }
    } else {
      products = await ProductModel.find();
      message = "Products fetched successfully!";
    }
    res.status(200).json({
      success: true,
      message: message,
      data: products,
    });
  } catch (err) {
    console.error("Failed to fetch products:", err);
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

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: product,
    });
  } catch (err) {
    console.error("Failed to fetch product:", err); 
    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: err,
    });
  }
});

productsRouter.put("/:productId", async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = productSchema.parse(req.body);

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Failed to update product:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: err,
    });
  }
});

productsRouter.delete("/:productId", async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const data = await ProductModel.deleteOne({ _id: productId });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err) {
    console.error("Failed to delete product:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err,
    });
  }
});

export default productsRouter;
