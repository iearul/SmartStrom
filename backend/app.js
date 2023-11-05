const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const { handleError } = require("./helpers/errorHandler");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

var cors = require("cors");

const app = express();

//To allow cross-origin requests
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (app.get("env") === "production") {
  const fs = require("fs");
  const path = require("path");
  var rfs = require("rotating-file-stream");

  const logPath = path.join(__dirname, "log");
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }
  const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "log"),
  });
  // log to a file
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  // log to stdout
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

app.use((err, req, res, next) => handleError(err, res));

// throw 404 if URL not found
app.all("*", function(req, res) {
	return res.status(404).json({status: 0,message: 'Page not found'})
});

module.exports = app;
