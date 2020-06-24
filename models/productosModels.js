'use strict'

const
    conn = require('./dbconecction.js'),
    productosModels = () => {}

productosModels.getall = (cb) => conn.query('SELECT * FROM productos', cb)
productosModels.getone = (id, cb) => conn.query('SELECT * FROM productos WHERE id = ?', [id], cb)
productosModels.insert = (producto, cb) => conn.query('INSERT INTO productos SET ?', producto, cb)
productosModels.update = (producto, cb) => conn.query('UPDATE productos SET ? WHERE id = ?', [producto, producto.id], cb)
productosModels.delete = (id, cb) => conn.query('DELETE FROM productos WHERE id = ?', [id], cb)

module.exports = productosModels


