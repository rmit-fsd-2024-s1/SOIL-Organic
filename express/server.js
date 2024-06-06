// server.js, Initiate the Express server and set up the routes.
const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
// db.sequelize.sync();

// const app = express();

// // Parse requests of content-type - application/json.
// app.use(express.json());

// // Add CORS suport.
// app.use(cors());

// // Simple Hello World route.
// app.get("/", (req, res) => {
//   res.json({ message: "Hello World!" });
// });

// // Add user routes.
// require("./src/routes/user.routes.js")(express, app);


// // Set port, listen for requests.
// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
// Sync database and start the server.
db.sync()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.get("/", (req, res) => {
      res.json({ message: "Hello World!" });
    });

    require("./src/routes/user.routes.js")(express, app);
    require("./src/routes/review.routes.js")(express, app);
    require("./src/routes/product.routes.js")(express, app);
    require("./src/routes/cart.routes.js")(express, app);

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error('Unable to start the server:', err);
  });