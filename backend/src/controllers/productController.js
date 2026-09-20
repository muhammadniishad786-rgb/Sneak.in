import Product from "../models/productModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, sizes, stock } =
      req.body;

    console.log("REQ BODY:", req.body);
    console.log("BRAND:", req.body.brand);
    console.log("REQ FILE:", req.file);
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
      image: `/uploads/${req.file.filename}`,
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
    const category = req.query.category;
    const sort = req.query.sort;

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

    if (category) {
      query.category = category;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Object for sorting
    const sortOption = {};

    // Price: low → high
    if (sort === "price_asc") {
      sortOption.price = 1;
    }

    // Price: high → low
    if (sort === "price_desc") {
      sortOption.price = -1;
    }

    // Get products using search/filter query and sorting option
    const products = await Product.find(query).sort(sortOption);

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

// to update products
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const {
      name,
      description,
      price,
      category,
      brand,
      sizes,
      stock,
    } = req.body;

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

    if (sizes) {
      product.sizes = sizes
        .split(",")
        .map((size) => Number(size.trim()));
    }

    product.stock = stock;

    // Update image only when a new image is uploaded
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

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
