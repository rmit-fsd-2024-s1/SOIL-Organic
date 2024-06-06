const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize instance with error handling.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Test the database connection.
db.sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.product = require("./models/products.js")(db.sequelize, DataTypes);
db.review = require("./models/reviews.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);

// Sync database schema and seed data.
db.sync = async () => {
  try {
    await db.sequelize.sync();
    await seedData();
  } catch (error) {
    console.error('An error occurred while syncing the database:', error);
  }
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  try {
    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({ username: "mbolger", password_hash: hash, email: "mbolger@example.com" });

    hash = await argon2.hash("def456", { type: argon2.argon2id });
    await db.user.create({ username: "shekhar", password_hash: hash, email: "shekhar@example.com" });
  } catch (error) {
    console.error('An error occurred while seeding the data:', error);
  }
}

module.exports = db;
