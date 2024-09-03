const mongoose = require("mongoose");
const http = require("http");


mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/surveydb", {})
  .then((res) => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log("error in creating DB connection", err);
  });
