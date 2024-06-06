// Initialize express and app
module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Log route registration
  console.log("Registering routes...");

  // Define routes
  router.get("/", controller.all);
  router.get("/select/:user_id", controller.one);
  router.get("/login", controller.login);
  // router.get("/email", (req, res) => {
  //   console.log("Request to /email received");
  //   controller.findByEmail(req, res);
  // });
  router.get('/email', controller.findByEmail);
  router.post("/create", controller.create);
  router.put('/:email', controller.update);
  router.delete('/:email', controller.delete);

  // Register routes
  app.use("/api/users", router);
};
