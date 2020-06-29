"use strict";

const
    productosModels = require("../models/productosModels.js"),
    productosControllers = () => { };

productosControllers.getall = (req, res, next) => {
    productosModels.getall((err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al consultar la base de datos",
                description: "Error de sintaxis sql",
                error: err,
            };
            res.render("error", locals);
        } else {
            let locals = {
                tittle: "Productos",
                data: rows,
            };
            res.render("productos", locals);
        }
    });
};

productosControllers.getone = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    productosModels.getone(id, (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al buscar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err,
            };
            res.render("error", locals);
        } else {
            let locals = {
                tittle: "Editar registro en la base de datos",
                data: rows,
            };
            console.log(rows[0]);
            res.render("edituprod", locals);
        }
    });
};

productosControllers.addprod = (req, res, next) => {
    res.render("addprod");
};

productosControllers.save = (req, res, next) => {
    let EDFile = [req.files.foto1, req.files.foto2, req.files.foto3]

    let productos = {
        id: req.body.id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        foto1: `${EDFile[0].name}`,
        foto2: `${EDFile[1].name}`,
        foto3: `${EDFile[2].name}`
    };

    function save(EDFile,) {
        for (let i = 0; i < EDFile.length; i++) {
            EDFile[i].mv(`./public/archivos/${EDFile[i].name}`, (err) => {
                if (err) {
                    let locals = {
                        tittle: "Error al Guardar el Archivo en la Carpeta",
                        description: "Error",
                        error: err,
                    };
                    res.render("error", locals);
                }
            });
        }
    }
    save(EDFile)

    productosModels.save(productos, (err, result) => {
        if (err) {
            let locals = {
                tittle: "Error al agregar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err,
            };
            res.render("error", locals);
        } else {
            res.redirect("/productos");
        }
    });
};

productosControllers.delete = (req, res, next) => {
    let id = req.params.id;
    console.log(id);
    productosModels.delete(id, (err, rows) => {
        if (err) {
            let locals = {
                tittle: "Error al eliminar el registro a la base de datos",
                description: "Error de sintaxis sql",
                error: err,
            };
            res.render("error", locals);
        } else {
            res.redirect("/productos");
        }
    });
};

// homeControlers.error404 = (req, res, next) => {}

module.exports = productosControllers;