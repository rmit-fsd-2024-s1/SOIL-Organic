module.exports = (express, app) => {
  const controller = require("../controllers/review.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select a single post with id.
  router.get("/select/:post_id", controller.one);

  // Create a new post.
  router.post("/", controller.create);

  // Delete a post
  router.delete("/select/:post_id", controller.delete);

  // Add routes to server.
  app.use("/api/reviews", router);
};
