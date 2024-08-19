import { Application, Request, Response } from "express";

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./Product.routes";

dotenv.config();

const app: Application = express();
app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
  } catch (error) {
    console.log("MongoDB Error: ", error);
    process.exit(1);
  }
}

app.use("/api/products", productsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
