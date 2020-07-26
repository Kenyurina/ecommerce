"use strict";

const 
  usuariosModels = require("../models/usuariosModels"),
  clientesModels = require("../models/usuariosModels"),
  myConn = require("../models/dbconecction"),
  awayControllers = () => {};

awayControllers.getall = async(req, res, next) => {
  console.log("Away y req: " + req.user.email);
  let email = req.user.email;
  const rows1 = await myConn.query("SELECT * FROM clientes WHERE email = ?", email);
  const rows2 = await myConn.query("SELECT * FROM usuarios WHERE email = ?", email);
  const usr1 = rows1[0];
  const usr2 = rows2[0];
  console.log(usr1);
  console.log(usr2);
  if (usr1) {
    console.log(`Away y req: Es un cliente ${email}`);
    res.redirect("/perfil")
  } else if (usr2) {
    console.log(`Away y req: Es un usuario ${email}`);
    res.redirect("/dashboard")
  }
};

module.exports = awayControllers;
