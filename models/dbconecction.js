"use strict";

const mysql = require("mysql"),
  conf = require("./dbconfig.json"),
  { promisify } = require("util"),
  dbOptions = {
    connectionLimit: conf.mysql.connectionLimit,
    host: conf.mysql.host,
    port: conf.mysql.port,
    user: conf.mysql.user,
    password: conf.mysql.password,
    database: conf.mysql.database,
    insecureAuth: conf.mysql.insecureAuth,
    _socket: conf.mysql._socket,
  },
  myConn = mysql.createPool(dbOptions);

myConn.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    if (err.code === "ETIMEDOUT") {
      console.error("ETIMEDOUT Database connection was refused");
    }
  }else{
    if (connection) connection.release();
    console.log(` DB mysql is Connected `);  
  }  

  return;
});

myConn.query = promisify(myConn.query);

module.exports = myConn;
