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
    console.log(`Login attempt for email: ${req.query.email}`);
    const user = await db.user.findOne({ where: { email: req.query.email } });
    if (!user) {
      console.log("User not found.");
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const passwordMatch = await argon2.verify(user.password_hash, req.query.password);
    if (!passwordMatch) {
      console.log("Password mismatch.");
      return res.status(401).json({ error: "Invalid email or password." });
    }

    console.log("Login successful.");
    res.json(user);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login." });
  }};

// Create a user in the database
exports.create = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    const hash = await argon2.hash(password, { type: argon2.argon2id });

    const user = await db.user.create({
      username,
      password_hash: hash,
      email,
      date_of_joining: new Date()  // Set the date of joining to the current date
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the user." });
  }
};




exports.findByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
    }
    const user = await db.User.findOne({ where: { email: email } });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error finding user by email:', error);
    res.status(500).json({ error: 'An error occurred while finding the user.' });
  }
};



exports.update = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await db.User.findOne({ where: { email: req.params.email } });
    if (user) {
      if (password) {
        user.password_hash = await argon2.hash(password, { type: argon2.argon2id });
      }
      user.username = username;
      user.email = email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email } });
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });

  }
};