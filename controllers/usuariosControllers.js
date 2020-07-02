'use strict'

const
    usuariosModels = require('../models/usuariosModels.js'),
    usuariosControllers = () => {}

usuariosControllers.getall = (req, res, next) => {
    usuariosModels.getall( (err, rows) => {
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

usuariosControllers.getone = (req, res, next) => {
    let id = req.params.id
    console.log(id)    
    usuariosModels.getone(id, (err, rows) => {
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

usuariosControllers.adduser = (req, res, next) => {
    res.render('adduser')
}

usuariosControllers.insert = (req, res, next) => {
    let usuario = { 
        email: req.body.username, 
        pass: req.body.password,
        nombre: req.body.nombre
    }
    usuariosModels.insert( usuario, (err, result) => {
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

usuariosControllers.update = (req, res, next) => {
    let usuario = { 
        id: req.body.id,
        email: req.body.username, 
        pass: req.body.password,
        nombre: req.body.nombre
    }
    usuariosModels.update( usuario, (err, result) => {
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

usuariosControllers.delete = (req, res, next) => {
    let id = req.params.id
    console.log(id)    
    usuariosModels.delete(id, (err, rows) => {
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

module.exports = usuariosControllers