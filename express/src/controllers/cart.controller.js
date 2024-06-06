const db = require("../database");

// Select all orders from the database.
exports.all = async (req, res) => {
  try {
    const orders = await db.carts.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
};

// Select one user's orders from the database.
exports.one = async (req, res) => {
  try {
    const orders = await db.carts.findAll({ where: { user_email: req.params.user_email } });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.status(404).json({ error: "No orders found for the user." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the user's orders." });
  }
};

// Create an order in the database
exports.create = async (req, res) => {
  try {
    const { user_email, orderId, item_name, quantity, price, totalPrice } = req.body;
    if (!user_email || !item_name || !quantity || !price || !totalPrice) {
      return res.status(400).json({ error: "User email, item name, quantity, price, and total price are required." });
    }

    const order = await db.carts.create({
      user_email,
      orderId,
      item_name,
      quantity,
      price,
      totalPrice
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the order." });
  }
};

// Delete an order in database
exports.delete = async (req, res) => {
  try {
    const order = await db.carts.findByPk(req.params.orderId);
    if (order) {
      await order.destroy();
      res.json({ message: 'Order deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'An error occurred while deleting the order.' });
  }
};

// Select an order in database
exports.getOrder = async (req, res) => {
  try {
    const order = await db.carts.findByPk(req.params.orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the order.' });
  }
};