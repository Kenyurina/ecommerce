"use strict";

const express = require("express"),
  fileUpload = require("express-fileupload"),
  app = express(),
  bodyParser = require("body-parser"),
  path = require("path"),
  auth = require("./routes/auth"),
  routes = require("./routes/router.js"),
  session = require("express-session"),
  passport = require("passport"),
  flash = require("connect-flash"),
  restFul = require("method-override")("_method");

app
  .set("view engine", "pug")
  .set("views", path.join(__dirname, "/views"))
  .use(fileUpload())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use("/static", express.static("public"))
  .use(restFul)
  .use(auth)
  .use(routes)
  .use(flash())
  .use(passport.initialize())
  .use(passport.session())
  .use(
    session({
      secret: "1qazxsw2*-",
      resave: true,
      saveUninitialized: true,
    })
  );

module.exports = app;
