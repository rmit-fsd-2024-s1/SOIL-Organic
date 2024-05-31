module.exports = (express, app) => {
    const controller = require("../controllers/product.controller.js");
    const router = express.Router();
  
    // Select all users.
    router.get("/", controller.all);
  
    // Select a single user with id.
    router.get("/select/:item_id", controller.one);
  
    // Select products from the database if product is special deal.
    router.get("/special", controller.special);
  
    // Create a new user.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/products", router);
  };
  