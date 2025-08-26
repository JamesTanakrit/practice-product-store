import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/api/products", productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});
