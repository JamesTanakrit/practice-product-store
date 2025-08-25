import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = 3000;

app.get("/products", (req, res) => {
  res.send("List of products");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server started at http://localhost:${port}`);
});
