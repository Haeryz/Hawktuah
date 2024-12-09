import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
      if (req.params.id) {
        // If an ID is provided, find the product by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, data: product });
      } else {
        // If no ID is provided, get all products
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
      }
    } catch (error) {
      console.error("Error : ", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatedProduct = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error : ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
