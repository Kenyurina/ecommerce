"use strict";

const express = require("express"),
  fileUpload = require("express-fileupload"),
  app = express(),
  path = require("path"),
  routes = require("./routes/router.js"),
  session = require("express-session"),
  passport = require("passport"),
  flash = require("connect-flash"),
  restFul = require("method-override")("_method"),
  morgan = require("morgan"),
  MySQLStore = require("express-mysql-session")(session),
  conection = require("./models/dbconfig.json");

// Intializations
require("./lib/passport");

app
  .set("view engine", "pug")
  .set("views", path.join(__dirname, "/views"));

//Middlewares
app
  .use(morgan("dev"))
  .use(fileUpload())
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(restFul)
  .use(flash())
  .use(
    session({
      secret: "1qazxsw2*-",
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore(conection.mysql),
    })
  )
  .use(passport.initialize())
  .use(passport.session());

// Global variables
app.use((req, res, next) => {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

//Routes
app
  .use(require("./routes/router"))
  .use(require("./routes/auth"));

//Statics files
app.use("/static", express.static("public"));

module.exports = app;
