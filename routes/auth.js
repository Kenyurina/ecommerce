"use strict";

const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  logg = require("../lib/isauth");

  router.get('/signup',logg.isNotLoggedIn,  (req, res) => { 
    console.log('get signup');
    res.render('auth')
  })
  router.post(
    "/signup",
    logg.isNotLoggedIn, passport.authenticate("local.signup", {
      successRedirect: "/success",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  router.get('/signin', logg.isNotLoggedIn, (req, res) => { 
    console.log('get signin');
    res.render('login')
  })

  router.post('/signin', logg.isNotLoggedIn, (req, res, next) => {
    //console.log(req.body);
    passport.authenticate('local.signin', {
      successRedirect: '/success',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  })

  router.get("/success", (req, res) => {
    console.log('success');
    res.redirect("/away");
  })

  router.get('/logout', (req, res) => {
    console.log("Logout");
    console.log(req.user);
    req.logOut();
    res.redirect('/');
  });

module.exports = router;