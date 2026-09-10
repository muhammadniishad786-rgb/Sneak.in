import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, sizes, stock } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const sizesArray = sizes.split(",").map(Number);

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      sizes: sizesArray,
      stock,
      image: req.file.path,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    // Get the search value from the URL query
    // Example: /api/product?search=nike → "nike"
    const search = req.query.search;

    // Create an empty object to build the MongoDB query
    const query = {};

    // Check if the user provided a search value
    if (search) {
      // Search inside the product "name" field
      query.name = {
        // Find products whose name contains the search text
        $regex: search,

        // "i" makes the search case-insensitive
        // Nike, nike, NIKE → all can match
        $options: "i",
      };
    }

    // Send the query to MongoDB and get matching products
    const products = await Product.find(query);

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const { name, description, price, category, brand, sizes, stock, image } =
      req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.sizes = sizes.split(",").map(Number);
    product.stock = stock;

    // Update image only if a new image was uploaded
    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(productId);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
