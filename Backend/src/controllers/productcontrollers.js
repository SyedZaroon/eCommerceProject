import Product from "../models/productModel.js";
import imagekit from "../utils/imagekit.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { title, description, basePrice, discountPrice, stock, sku} = req.body;

    // Check if the SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({ message: "SKU already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Product image is required" });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: `product_${Date.now()}_${req.file.originalname}`,
      folder: "/eCommerce/products", 
    });

    const newProduct = new Product({
      title,
      description,
      basePrice,
      discountPrice,
      stock,
      sku,
      productImg: uploadResponse.url,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const updates = {};
    for (const field of ["title", "description", "basePrice", "discountPrice", "stock", "sku"]) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `product_${Date.now()}_${req.file.originalname}`,
        folder: "/eCommerce/products",
      });
      updates.productImg = uploadResponse.url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    const statusCode = error.code === 11000 ? 400 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};