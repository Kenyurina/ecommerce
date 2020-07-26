"use strict";

const express = require("express"),
  Router = express.Router(),
  logg = require("../lib/isauth"),
  its = require("../lib/isaclient"),
  homeControllers = require("../controllers/homeControllers"),
  awayControllers = require("../controllers/awayControllers"),
  perfilControllers = require("../controllers/perfilControllers"),
  dashboardControllers = require("../controllers/dashboardControllers"),
  productosControllers = require("../controllers/productosControllers"),
  usuaruiosControllers = require("../controllers/usuariosControllers");

//-------------------- Rutas para Home  -----------------------------//
Router
  .get("/", homeControllers.getall);

  //-------------------- Rutas para Away  -----------------------------//
Router
  .get("/away", awayControllers.getall);

  //-------------------- Rutas para Dashboard  -----------------------------//
Router
  .get("/dashboard", logg.isLoggedIn, its.isNoAclient, dashboardControllers.getall);

  //-------------------- Rutas para Perfil  -----------------------------//
Router
  .get("/perfil", logg.isLoggedIn, its.isAclient, perfilControllers.getall);

//-------------------- Rutas para Usuarios  -----------------------------//
Router
  .get("/usuario", logg.isLoggedIn, its.isNoAclient, usuaruiosControllers.getall)
  .get("/editusuario/:id", logg.isLoggedIn, its.isNoAclient,  usuaruiosControllers.getone)
  .get("/newuser", logg.isLoggedIn, its.isNoAclient,  usuaruiosControllers.adduser)
  .post("/addUsuario", logg.isLoggedIn, its.isNoAclient,  usuaruiosControllers.save)
  .put("/updateUser", logg.isLoggedIn, its.isNoAclient,  usuaruiosControllers.save)
  .delete("/deleteUser/:id", logg.isLoggedIn, its.isNoAclient,  usuaruiosControllers.delete);

//-------------------- Rutas para admin productos del ecommerce -----------------------------//
Router
  .get("/productos", logg.isLoggedIn, its.isNoAclient,  productosControllers.getall)
  .get("/addprod", logg.isLoggedIn, its.isNoAclient,  productosControllers.addprod)
  .get("/editprod/:id", logg.isLoggedIn, its.isNoAclient,  productosControllers.getone)
  .post("/insetarprod", logg.isLoggedIn, its.isNoAclient,  productosControllers.save)
  .put("/updateProd", logg.isLoggedIn, its.isNoAclient,  productosControllers.save)
  .delete("/deleteProd/:id", logg.isLoggedIn, its.isNoAclient,   productosControllers.delete);

module.exports = Router;
