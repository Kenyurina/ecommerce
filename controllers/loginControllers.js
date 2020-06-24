'use strict'

const
    loginModels = require('../models/loginModels.js'),
    loginControllers = () => {}

loginControllers.get = (req, res, next) => {
    res.render('login')
}

loginControllers.login = (req, res, next) => {
    var username = req.body.username;
	var password = req.body.password;
	if (username && password) {
        loginModels.login( [username, password], (error, results, fields) => {
                if (results.length > 0) {
                    //req.session.loggedin = true;
                    //req.session.username = username;
                    res.redirect('/usuario');
                } else {
                    res.send('Incorrect Username and/or Password!');
                }			
                res.end();
            }
        )
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
}

// loginControlers.insert = (req, res, next) => {}

// loginControlers.update = (req, res, next) => {}

// loginControlers.delete = (req, res, next) => {}

// loginControlers.error404 = (req, res, next) => {}

module.exports = loginControllers

