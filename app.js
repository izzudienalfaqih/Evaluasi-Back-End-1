var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const notFoundMiddleWare = require("./app/middleware/not-found");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  res.send(`get data todo with id ${id}`);
});

app.get("/todos", (req, res) => {
  const { keyword, title } = req.query;
  res.send(`Get todo with keyword ${keyword}`);
});

app.use(notFoundMiddleWare);

module.exports = app;
