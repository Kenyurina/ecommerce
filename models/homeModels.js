'use strict'

const
    conn = require('./dbconecction.js'),
    homeModels = () => {}

homeModels.getall = (cb) => conn.query('SELECT * FROM usuarios', cb)
homeModels.getone = (id, cb) => conn.query('SELECT * FROM usuarios WHERE id = ?', [id], cb)
homeModels.insert = (usuario, cb) => conn.query('INSERT INTO usuarios SET ?', usuario, cb)
homeModels.update = (usuario, cb) => conn.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, usuario.id], cb)
homeModels.delete = (id, cb) => conn.query('DELETE FROM usuarios WHERE id = ?', [id], cb)

module.exports = homeModels