const db = require("../database");

// Select one product from the database.
exports.findOne = async (req, res) => {
  try {
    const product = await db.product.findByPk(req.params.item_id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the product." });
  }
};

// Fetch all standard products
exports.getStandardProducts = async (req, res) => {
  try {
    const products = await db.product.findAll({ where: { type: 'standard' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching standard products." });
  }
};

// Fetch all special products
exports.getSpecialProducts = async (req, res) => {
  try {
    const products = await db.product.findAll({ where: { type: 'special' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching special products." });
  }
};

// Create a product in the database.
exports.create = async (req, res) => {
  try {
    const newProduct = await db.product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the product." });
  }
};
