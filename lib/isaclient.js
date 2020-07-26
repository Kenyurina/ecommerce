'use strict'

const 
  myConn = require("../models/dbconecction"),
  its = () => {}

its.isAclient = async(req, res, next) => {
  const
    email = req.user.email,
    rows1 = await myConn.query("SELECT * FROM clientes WHERE email = ?", email),
    usr1 = rows1[0]
    console.log(`It's a Client: ${email}`);
  if ( usr1 ) {
    //console.log(req.user);
    return next();
  }
  return res.redirect("/dashboard");
}

its.isNoAclient = async (req, res, next) => {
  const 
    email = req.user.email,
    rows1 = await myConn.query("SELECT * FROM usuarios WHERE email = ?", email),
    usr1 = rows1[0];
  console.log(`It's a User: ${email}`);
  if (usr1) {
    //console.log(req.user);
    return next();
  }
  return res.redirect("/perfil");
};
module.exports = its