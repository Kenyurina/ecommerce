'use strict'

const
    conn = require('./dbconecction.js'),
    loginModels = () => {}

    loginModels.login = ([username, password], cb) => {
        conn.query('SELECT * FROM usuarios WHERE email = ? AND pass = ?', [username, password], cb)
    }

module.exports = loginModels