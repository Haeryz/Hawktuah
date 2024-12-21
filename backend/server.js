import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";
import motionRoutes from "./routes/motion.route.js";
import systemStateRoutes from "./routes/systemState.route.js";

dotenv.config();
const app = express();

const __dirname = path.resolve();
app.use(express.json()); // Parse JSON request bodies if needed
app.use("/api/products", productRoutes);
app.use("/api/motions", motionRoutes);
app.use("/api/system-state", systemStateRoutes);
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

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
