'use strict'

const
    conn = require('./dbconecction.js'),
    productosModels = () => {}

productosModels.getall = (cb) => conn.query('SELECT * FROM productos', cb)
productosModels.getone = (id, cb) => conn.query('SELECT * FROM productos WHERE id = ?', [id], cb)
productosModels.save = (productos, cb) => {
    conn.query('SELECT * FROM productos WHERE id = ?', productos.id, (err, rows) => {
        if (err) {
            return err
        } else {
            return (rows.length == 1) ? conn.query('UPDATE productos SET ? WHERE id = ?', [productos, productos.id], cb) : conn.query('INSERT INTO productos SET ?', productos, cb)
        }
    })
}
productosModels.delete = (id, cb) => conn.query('DELETE FROM productos WHERE id = ?', [id], cb)
//productosModels.insert = (productos, cb) => conn.query('INSERT INTO productos SET ?', productos, cb)
//productosModels.update = (producto, cb) => conn.query('UPDATE productos SET ? WHERE id = ?', [producto, producto.id], cb)
module.exports = productosModels