const express = require("express");
const globalErrorHandler = require("./utils/globalErrorHandler");
const { applyMiddleware } = require("./middlewares");
require("dotenv").config();
const app = express();

app.use(express.urlencoded({ extended: true }));

// Apply other middlewares
applyMiddleware(app);

// Auth Routes
app.use(require("./routes/auth"));
// Students Routes
app.use(require("./routes/students"));

// Payments Routes
app.use(require("./routes/payment"));

app.get("/health", (_req, res) => {
  res.send({ message: "Server is running...." });
});

app.all("*", (req, _res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on the server`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use(globalErrorHandler);

module.exports = app;
