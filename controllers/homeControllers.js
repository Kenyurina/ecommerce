'use strict'

const
    homeModels = require('../models/homeModels.js'),
    homeControllers = () => {}

homeControllers.getall = (req, res, next) => {
    homeModels.getall( (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al consultar la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)            
        } else {
            let locals = {
                tittle: "Usuarios",
                data: rows
            } 
            res.render('usuarios', locals)   
        }
    } )
}

homeControllers.getone = (req, res, next) => {
    let id = req.params.id
    console.log(id)    
    homeModels.getone(id, (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al buscar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)            
        } else {
            let locals = {
                tittle: "Editar registro en la base de datos",
                data: rows
            }
            console.log(rows[0])
            res.render('edituser', locals)   
        }
    })
}

homeControllers.adduser = (req, res, next) => {
    res.render('adduser')
}

homeControllers.insert = (req, res, next) => {
    let usuario = { 
        email: req.body.username, 
        pass: req.body.password,
        nombre: req.body.nombre
    }
    homeModels.insert( usuario, (err, result) => {
        if (err) {
            let locals = {
                tittle: "Error al agregar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)            
        } else {
            res.redirect('/usuario')   
        }
    } )
}

homeControllers.update = (req, res, next) => {
    let usuario = { 
        id: req.body.id,
        email: req.body.username, 
        pass: req.body.password,
        nombre: req.body.nombre
    }
    homeModels.update( usuario, (err, result) => {
        if (err) {
            let locals = {
                tittle: "Error al actualizar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)            
        } else {
            res.redirect('/usuario')   
        }
    })
}

homeControllers.delete = (req, res, next) => {
    let id = req.params.id
    console.log(id)    
    homeModels.delete(id, (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al eliminar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)            
        } else {
            res.redirect('/usuario')   
        }
    })
}

// homeControlers.error404 = (req, res, next) => {}

module.exports = homeControllers