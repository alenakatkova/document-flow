const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const userRouter = require("./routes/user");
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/api", (req, res) => {
  res.send("<h2>Hello there</h2>");
});

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
