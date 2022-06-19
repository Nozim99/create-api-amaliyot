const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
// Routes
const indexRouter = require("./routes/index");
const musicRouter = require("./routes/music");
const authorRouter = require("./routes/author");
// Express init
const app = express();

// MongoDB connection
const db = require("./helpers/mongodb")();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/music", musicRouter);
app.use("/api/author", authorRouter);


module.exports = app;
