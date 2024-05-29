const db = require("../database");

// Select all reviews from the database.
exports.all = async (req, res) => {
  try {
    const reviews = await db.reviews.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching reviews." });
  }
};

// Select one review from the database by post_id.
exports.one = async (req, res) => {
  try {
    const review = await db.reviews.findByPk(req.params.post_id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: "Review not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the review." });
  }
};

// Create a review in the database.
exports.create = async (req, res) => {
  try {
    const review = await db.reviews.create({
      userName: req.body.userName,
      numberOfStars: req.body.numberOfStars,
      content: req.body.content
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the review." });
  }
};

// Delete a review from the database by post_id.
exports.delete = async (req, res) => {
  try {
    const result = await db.reviews.destroy({
      where: {
        post_id: req.params.post_id
      }
    });

    if (result) {
      res.json({ message: "Review deleted successfully." });
    } else {
      res.status(404).json({ error: "Review not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the review." });
  }
};
