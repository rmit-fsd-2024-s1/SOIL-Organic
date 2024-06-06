module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  // Select all standard products
  router.get("/standard", controller.getStandardProducts);

  // Select a single product with id
  router.get("/select/:item_name", controller.findOne);

  // Select special products from the database
  router.get("/special", controller.getSpecialProducts);

  // Create a new product
  router.post("/", controller.create);

  // Add routes to server
  app.use("/api/products", router);
};
