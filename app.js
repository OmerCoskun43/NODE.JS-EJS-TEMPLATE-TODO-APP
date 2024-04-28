"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data and convert object:
app.use(express.json());

// Catch async-errors:
require("express-async-errors");

//form data accept
app.use(express.urlencoded({ extended: true }));
/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.redirect("/view");
});

//! Template Engine
app.set("view engine", "ejs");
app.set("views", "./public");

// Routes:

app.use("/api", require("./app/routes/todo.router"));
app.use("/view", require("./app/routes/todo.view.router"));

/* ------------------------------------------------------- */
// ErrorHandler:
app.use(require("./app/errorHandler"));
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
