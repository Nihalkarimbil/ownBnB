require("dotenv").config();
const Express = require("express");
const mongoose = require("mongoose");

const app = Express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("database connection error", error)
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
