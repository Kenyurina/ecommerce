'use strict'

const
    express = require('express'),
    Router = express.Router(),
    homeControllers = require('../controllers/homeControllers.js'),
    loginControllers = require('../controllers/loginControllers.js'),
    productosControllers = require('../controllers/productosControllers.js')



//-------------------- Rutas para Login -----------------------------//
Router
    .get('/', loginControllers.get)
    .post( '/auth', loginControllers.login )

//-------------------- Rutas para Home  -----------------------------//
Router
    .get('/usuario', homeControllers.getall)
    .get('/editusuario/:id', homeControllers.getone)
    .get('/newuser', homeControllers.adduser)
    .post('/usuario', homeControllers.insert)
    .post('/updateUser', homeControllers.update)
    .post('/deleteUser/:id', homeControllers.delete)
    .put( '/', (req, res) => { res.status(200).send('<h1> Bienvenido a mi ecommerce por PUT</h1>') } )
    .delete( '/', (req, res) => { res.status(200).send('<h1> Bienvenido a mi ecommerce por DELETE</h1>') } )

//-------------------- Rutas para admin productos del ecommerce -----------------------------//

Router 
    .get('/productos', productosControllers.getall)
    .get('/addprod', productosControllers.addprod)
    .get('/editprod/:id', productosControllers.getone)
    .post('/insetarprod', productosControllers.insert)
    .post('/updateProd', productosControllers.update)
    .post('/deleteProd/:id', productosControllers.delete)

    // .post('/fileupload', productosControllers.addimg)

module.exports = Router

