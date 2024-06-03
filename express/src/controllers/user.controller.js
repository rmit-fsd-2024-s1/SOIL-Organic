const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

// Select one user from the database.
exports.one = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.user_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the user." });
  }
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });

    if (user === null || await argon2.verify(user.password_hash, req.query.password) === false) {
      // Login failed.
      res.status(401).json({ error: "Invalid email or password." });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login." });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required." });
    }
    
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

    const user = await db.user.create({
      username: req.body.username,
      password_hash: hash,
      email: req.body.email,
      date_of_joining: new Date()  // Set the date of joining to the current date.
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};

// Update user profile in the database.
exports.update = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.user_id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password_hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
      }
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
};

// Delete user profile from the database.
exports.delete = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.user_id);
    if (user) {
      await user.destroy();
      res.json({ message: "User deleted successfully." });
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the user." });
  }
};