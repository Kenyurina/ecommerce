'use strict'

const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    rautes = require('./routes/router.js'),
    session = require('express-session'),
    mysql = require('mysql'),
    publicDir = express.static(`${__dirname}/public`),
    restFul = require('method-override')('_method')

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, '/views'))
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use(publicDir)
    .use(restFul)
    .use(rautes)
    .use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

module.exports = app