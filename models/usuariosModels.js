'use strict'

const
    conn = require('./dbconecction.js'),
    usuariosModels = () => {}

usuariosModels.getall = (cb) => conn.query('SELECT * FROM usuarios', cb)
usuariosModels.getone = (id, cb) => conn.query('SELECT * FROM usuarios WHERE id = ?', [id], cb)
usuariosModels.save = (usuario, cb) => {
    conn.query('SELECT * FROM usuarios WHERE id = ?', usuario.id, (err, rows) => {
        if (err) {
            return err
        } else {
            return (rows.length == 1) ? conn.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, usuario.id], cb) : conn.query('INSERT INTO usuarios SET ?', usuario, cb)
        }
    } )
}
usuariosModels.delete = (id, cb) => conn.query('DELETE FROM usuarios WHERE id = ?', [id], cb)

module.exports = usuariosModels