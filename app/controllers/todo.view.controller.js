"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
// CONTROLLERS:

const Todo = require("../models/todo.model");

const PRIORITY = {
  "1": "High",
  "0": "Medium",
  "-1": "Low",
};

module.exports = {
  list: async (req, res) => {
    const data = await Todo.findAndCountAll({
      order: [["id", "desc"]],
    });

    res.render("todoList.ejs", {
      todos: data.rows,
      count: data.count,
      PRIORITY,
    });
  },

  // CRUD:

  create: async (req, res) => {
    if (req.method == "POST") {
      const data = await Todo.create(req.body);
      if (data) {
        res.redirect("/view");
      } else {
        res.redirect("/view/create");
      }
    } else {
      res.render("todoCreate.ejs", { PRIORITY });
    }
  },

  read: async (req, res) => {
    // const data = await Todo.findOne({ where: { id: req.params.id } })
    const data = await Todo.findByPk(req.params.id);

    res.render("todoRead.ejs", { todo: data, PRIORITY });
  },

  update: async (req, res) => {
    // const data = await Todo.update(req.body, { where: { id: req.params.id } });

    if (req.method == "POST") {
      await Todo.update(req.body, { where: { id: req.params.id } });
      res.redirect("/view");
    } else {
      const data = await Todo.findByPk(req.params.id);
      res.render("todoUpdate.ejs", { todo: data, PRIORITY });
    }
  },

  delete: async (req, res) => {
    // const data = await Todo.destroy({ ...where })
    const data = await Todo.destroy({ where: { id: req.params.id } });

    if (data > 0) {
      res.redirect("/view");
    } else {
      res.errorStatusCode = 404;
      throw new Error("Not Found.");
    }
  },
};
