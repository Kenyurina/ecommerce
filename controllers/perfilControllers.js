"use strict";

const dashboardModels = require("../models/dashboardModels.js"),
  perfilControllers = () => {};

perfilControllers.getall = (req, res, next) => {
  console.log("perfil y req: " + req.user.email);
  res.render("perfil");
};

module.exports = perfilControllers;
