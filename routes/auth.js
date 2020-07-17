"use strict";

const 
  express = require("express"),
  router = express.Router(),
  passport = require('passport'),
  { isLoggedIn } = require('../lib/isauth');

  router.get('/signup', (req, res) => { 
    console.log('get signup');
    res.send('FailureSignup')
  })
  router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/success',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  router.get('/signin', (req, res) => { 
    console.log('get signin');
    res.json({ status: "Inicia" });
  })

  router.post('/signin', (req, res, next) => {
    console.log(req.body);
    
    passport.authenticate('local.signin', {
      successRedirect: '/success',
      failureRedirect: '/signin',
      failureFlash: true
    })(req, res, next);
  })

  router.get('/success', isLoggedIn, (req, res) => {
    res.send('Welcome, this is succes profile');
  })

  router.get('/logout', (req, res) => {

    req.logOut();
    console.log('Logout');
    
    res.redirect('/');
  });

module.exports = router;