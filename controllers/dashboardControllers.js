"use strict";

const dashboardModels = require("../models/dashboardModels.js"),
  dashboardControllers = () => {};

dashboardControllers.getall = (req, res, next) => {
  console.log("Dashboard y req: " + req.user.email);
  res.render("home");
};

module.exports = dashboardControllers;
