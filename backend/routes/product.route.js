import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProduct, deleteProduct, getProducts, updatedProduct } from "../controllers/product.controller.js";

const router = express.Router();

// Routes
router.post("/", createProduct);

router.get("/:id", getProducts);

router.delete("/:id", deleteProduct);

router.put("/:id", updatedProduct);

export default router;
