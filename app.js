'use strict'

const 
    express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    routes = require('./routes/router.js'),
    session = require('express-session'),
    restFul = require('method-override')('_method')

app
    .set('view engine', 'pug')
    .set('views', path.join(__dirname, '/views'))
    .use(fileUpload())
    .use(bodyParser.urlencoded({extended:true}))
    .use(bodyParser.json())
    .use('/static', express.static('public'))
    .use(restFul)
    .use(routes)
    .use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));

module.exports = app