'use strict'

const
    express = require('express'),
    Router = express.Router(),
    homeControllers = require('../controllers/homeControllers.js'),
    loginControllers = require('../controllers/loginControllers.js'),
    productosControllers = require('../controllers/productosControllers.js'),
    usuaruiosControllers = require('../controllers/usuariosControllers')


//-------------------- Rutas para Home  -----------------------------//
Router
    .get('/', homeControllers.getall)

//-------------------- Rutas para Login -----------------------------//
Router
    .get('/login', loginControllers.get)
    .post( '/auth', loginControllers.login )

//-------------------- Rutas para Usuarios  -----------------------------//
Router
    .get('/usuario', usuaruiosControllers.getall)
    .get('/editusuario/:id', usuaruiosControllers.getone)
    .get('/newuser', usuaruiosControllers.adduser)
    .post('/usuario', usuaruiosControllers.insert)
    .post('/updateUser', usuaruiosControllers.update)
    .post('/deleteUser/:id', usuaruiosControllers.delete)
    .put( '/', (req, res) => { res.status(200).send('<h1> Bienvenido a mi ecommerce por PUT</h1>') } )
    .delete( '/', (req, res) => { res.status(200).send('<h1> Bienvenido a mi ecommerce por DELETE</h1>') } )

//-------------------- Rutas para admin productos del ecommerce -----------------------------//

Router 
    .get('/productos', productosControllers.getall)
    .get('/addprod', productosControllers.addprod)
    .get('/editprod/:id', productosControllers.getone)
    .post('/insetarprod', productosControllers.save)
    .put('/updateProd', productosControllers.save)
    .delete('/deleteProd/:id', productosControllers.delete)

module.exports = Router

