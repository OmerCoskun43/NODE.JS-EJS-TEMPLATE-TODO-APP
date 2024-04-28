"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// ROUTERS:

const todo = require("../controllers/todo.view.controller");

const router = require("express").Router();

router.all("/", todo.list);
router.all("/create", todo.create);
router.all("/:id", todo.read);
router.all("/:id/delete", todo.delete);
router.all("/:id/update", todo.update);

module.exports = router;
