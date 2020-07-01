'use strict'

const
    mysql = require('mysql'),
    conf = require('./dbconfig.json'),
    dboptions = {
        "host" : conf.mysql.host,
        "user" : conf.mysql.user,
        "password" : conf.mysql.password,
        "database" : conf.mysql.database,
        "insecureAuth" : conf.mysql.insecureAuth,
    },
    myconn = mysql.createConnection(dboptions)

myconn.connect( (err) => {
    return (err) ? console.log(`Error al conectarse a mysql: ${err.stack}`) : console.log( `Conexion establecida con mysql N: ${myconn.threadId}` )    
} )
module.exports = myconn