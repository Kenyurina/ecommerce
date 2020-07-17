"use strict";

const 
  express = require("express"),
  Router = express.Router(),
  homeControllers = require("../controllers/homeControllers.js"),
  productosControllers = require("../controllers/productosControllers.js"),
  usuaruiosControllers = require("../controllers/usuariosControllers");

//-------------------- Rutas para Home  -----------------------------//
Router
  .get("/", homeControllers.getall);

//-------------------- Rutas para Usuarios  -----------------------------//
Router
  .get("/usuario", usuaruiosControllers.getall)
  .get("/editusuario/:id", usuaruiosControllers.getone)
  .get("/newuser", usuaruiosControllers.adduser)
  .post("/addUsuario", usuaruiosControllers.save)
  .put("/updateUser", usuaruiosControllers.save)
  .delete("/deleteUser/:id", usuaruiosControllers.delete);

//-------------------- Rutas para admin productos del ecommerce -----------------------------//
Router
  .get("/productos", productosControllers.getall)
  .get("/addprod", productosControllers.addprod)
  .get("/editprod/:id", productosControllers.getone)
  .post("/insetarprod", productosControllers.save)
  .put("/updateProd", productosControllers.save)
  .delete("/deleteProd/:id", productosControllers.delete);

module.exports = Router;
