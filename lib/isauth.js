'use strict'
const logg = () => {}

logg.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //console.log(req.user);
    return next();
  }
  return res.redirect("/signin");
}

logg.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/success");
  }
module.exports = logg