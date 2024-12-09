import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies if needed

// Define a route for the root URL "/"
app.get("/", (req, res) => {
  res.send("Balls");
});

app.use("/api/products", productRoutes);

// Start the server and connect to the database
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`Server error: ${error.message}`);
  }
};

startServer();
