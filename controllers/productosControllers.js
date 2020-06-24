'use strict'

const
    fs = require('fs'),
    formidable = require('formidable'),
    productosModels = require('../models/productosModels.js'),
    productosControllers = () => { }

productosControllers.getall = (req, res, next) => {
    productosModels.getall((err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al consultar la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)
        } else {
            let locals = {
                tittle: "Productos",
                data: rows
            }
            res.render('productos', locals)
        }
    })
}

productosControllers.addprod = (req, res, next) => {
    res.render('addprod')
}

productosControllers.insert = (req, res, next) => {

    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.foto.path;
        console.log(oldpath);
        var newpath = 'C:/Users/Ken/Desktop/' + files.foto.name;
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.redirect('/productos')
        });
    });

    let productos = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        foto: req.body.foto
    }

    console.log(productos);
    
    productosModels.insert(productos, (err, result) => {
        if (err) {
            let locals = {
                tittle: "Error al agregar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)
        } else {
            res.redirect('/productos')
        }
    })
}



productosControllers.getone = (req, res, next) => {
    let id = req.params.id
    console.log(id)
    productosModels.getone(id, (err, rows) => {
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
            res.render('edituprod', locals)
        }
    })
}

productosControllers.update = (req, res, next) => {
    let producto = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        foto: req.body.foto
    }
    productosModels.update(producto, (err, result) => {
        if (err) {
            let locals = {
                tittle: "Error al actualizar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)
        } else {
            res.redirect('/productos')
        }
    })
}

productosControllers.delete = (req, res, next) => {
    let id = req.params.id
    console.log(id)
    productosModels.delete(id, (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al eliminar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err
            }
            res.render('error', locals)
        } else {
            res.redirect('/productos')
        }
    })
}

// homeControlers.error404 = (req, res, next) => {}

module.exports = productosControllers



// productosControllers.addimg = (req, res, next) => {

//     let form = new formidable.IncomingForm()

//     form.parse(req, function (err, fields, files) {
//         var oldpath = files.filetoupload.path
//         var newpath = 'C:/Users/Ken/Desktop/ecommerce/public/' + files.filetoupload.name

//         fs.rename(oldpath, newpath, function (err) {
//           if (err) throw err
//           res.write('File uploaded and moved!')
//           res.end()
//         })
//     })
// }