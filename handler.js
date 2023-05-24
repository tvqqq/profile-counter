require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();

// cors
const cors = require("cors");
app.use(cors());

// routes
const routes = require("./routes");
app.use("/", routes);

const slsHandler = serverless(app);

module.exports = {
  serverless: slsHandler,
  default: app,
};
