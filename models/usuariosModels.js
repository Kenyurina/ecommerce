'use strict'

const
    conn = require('./dbconecction.js'),
    usuariosModels = () => {}

usuariosModels.getall = (cb) => conn.query('SELECT * FROM usuarios', cb)
usuariosModels.getone = (id, cb) => conn.query('SELECT * FROM usuarios WHERE id = ?', [id], cb)
usuariosModels.insert = (usuario, cb) => conn.query('INSERT INTO usuarios SET ?', usuario, cb)
usuariosModels.update = (usuario, cb) => conn.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, usuario.id], cb)
usuariosModels.delete = (id, cb) => conn.query('DELETE FROM usuarios WHERE id = ?', [id], cb)

module.exports = usuariosModels