"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");

  const data = {
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  };

  if (req.originalUrl.startsWith("/api")) {
    res.status(errorStatusCode).send(data);
  } else {
    res.render("errors.ejs", { data });
  }
};
