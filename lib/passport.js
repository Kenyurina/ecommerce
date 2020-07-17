const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const myConn = require("../models/dbconnection");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pass",
      passReqToCallback: true,
    },
    async (req, email, pass, done) => {
      const rows = await myConn.query(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
      if (rows.length > 0) {
        const user = rows[0];
        user.id = user.id_usuario;
        console.log(user);
        const validPassword = await helpers.matchPassword(pass, user.pass);
        if (validPassword) {
          done(null, user, console.log("Welcome " + user.email));
        } else {
          done(null, console.log("clave invalida"));
        }
      } else {
        return done(null, false, console.log("The Username does not exists."));
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pass",
      passReqToCallback: true,
    },
    async (req, email, pass, done) => {
      const { nombre, id_tipo_usuario } = req.body;
      let newUser = {
        id_tipo_usuario,
        nombre,
        email,
        pass,
      };
      newUser.pass = await helpers.encryptPassword(pass);
      // Saving in the Database
      const result = await myConn.query("INSERT INTO usuarios SET ? ", [
        newUser,
      ]);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await myConn.query(
    "SELECT * FROM usuarios WHERE id_usuario = ?",
    [id]
  );
  done(null, rows[0]);
});
