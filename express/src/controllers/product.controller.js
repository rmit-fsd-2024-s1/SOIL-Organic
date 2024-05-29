const db = require("../database");

// Select all products from the database.
exports.all = async (req, res) => {
  const products = await db.products.findAll();

  res.json(products);
};

// Select one product from the database.
exports.one = async (req, res) => {
  const product = await db.products.findByPk(req.params.item_id);

  res.json(product);
};

// Select special products from the database
exports.special = async (req, res) => {
    const specials = await db.products.findByPk(req.params.special);

    res.json(specials);
}

// Create a product in the database.
exports.create = async (req, res) => {
  const product = await db.products.create({
    item_name: req.body.item_name,
    quantity: req.body.quantity,
    special: req.body.special
  });

  res.json(product);
};
