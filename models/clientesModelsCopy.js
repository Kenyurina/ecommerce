"use strict";

const 
  conn = require("./dbconecction.js"),
  clientesModels = () => {};

clientesModels.getall = (cb) => conn.query("SELECT * FROM clientes", cb);
clientesModels.getone = (id, cb) => conn.query("SELECT * FROM clientes WHERE id = ?", [id], cb);
clientesModels.save = (cliente, cb) => {
  conn.query("SELECT * FROM  clientes WHERE id = ?",  cliente.id, (err, rows) => {
    if (err) {
      return err;
    } else {
      return rows.length == 1
        ? conn.query(
            "UPDATE  clientes SET ? WHERE id = ?",
            [ cliente,  cliente.id],
            cb
          )
        : conn.query("INSERT INTO  clientes SET ?",  cliente, cb);
    }
  });
};
clientesModels.delete = (id, cb) => conn.query("DELETE FROM  clientes WHERE id = ?", [id], cb);

module.exports =  clientesModels;
