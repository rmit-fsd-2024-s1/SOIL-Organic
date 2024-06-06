module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Select all orders
  router.get("/", controller.all);

  // Select one user's orders
  router.get("/user/:user_email", controller.one);

  // Create a new order
  router.post("/", controller.create);

  // Delete an order
  router.delete("/:orderId", controller.delete);

  // Select a single order
  router.get("/:orderId", controller.getOrder);

  // Add routes to server
  app.use("/api/carts", router);
};