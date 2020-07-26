const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const myConn = require("../models/dbconecction");
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
      console.log(`Passport local.signin: ${email}`);
      const rows1 = await myConn.query("SELECT * FROM clientes WHERE email = ?", [email]);
      const rows2 = await myConn.query("SELECT * FROM usuarios WHERE email = ?", [email]);
      const usr1 = rows1[0];
      const usr2 = rows2[0];
      if (usr1) {
        if (rows1.length > 0) {
          let user = rows1[0];
          user.id = user.id;
          console.log(`Passport local.signin: Es un cliente ${usr1.email}`);
          const validPassword = await helpers.matchPassword(pass, user.pass);
          if (validPassword) {
            done(null, user, console.log("Welcome " + user.email));
          } else {
            done(null, console.log("clave invalida"));
          }
        }
      } else if (usr2) {
        if (rows2.length > 0) {
          let user = rows2[0];
          user.id = user.id;
          console.log(`Passport local.signin: Es un usuario ${usr2.email}`);
          const validPassword = await helpers.matchPassword(pass, user.pass);
          if (validPassword) {
            done(null, user, console.log("Welcome " + user.email));
          } else {
            done(null, console.log("clave invalida"));
          }
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
      const { id, nombre, apellido, edad, genero, telefono, ciudad } = req.body;
      let newUser = {
        id,
        nombre,
        apellido,
        edad,
        genero,
        email,
        pass,
        telefono,
        ciudad,
      };
      newUser.pass = await helpers.encryptPassword(pass);
      // Saving in the Database
      const result = await myConn.query("INSERT INTO clientes SET ? ", [
        newUser,
      ]);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

// passport.use(
//   "local.signin",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "pass",
//       passReqToCallback: true,
//     },
//     async (req, email, pass, done) => {
//       const rows = await myConn.query(
//         "SELECT * FROM usuarios WHERE email = ?",
//         [email]
//       );
//       if (rows.length > 0) {
//         const user = rows[0];
//         user.id = user.id;
//         console.log(user);
//         const validPassword = await helpers.matchPassword(pass, user.pass);
//         if (validPassword) {
//           done(null, user, console.log("Welcome " + user.email));
//         } else {
//           done(null, console.log("clave invalida"));
//         }
//       } else {
//         return done(null, false, console.log("The Username does not exists."));
//       }
//     }
//   )
// );


// passport.use(
//   "local.signup",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "pass",
//       passReqToCallback: true,
//     },
//     async (req, email, pass, done) => {
//       const { nombre, apellido, id } = req.body;
//       let newUser = {
//         id,
//         nombre,
//         apellido,
//         email,
//         pass,
//       };
//       newUser.pass = await helpers.encryptPassword(pass);
//       // Saving in the Database
//       const result = await myConn.query("INSERT INTO usuarios SET ? ", [
//         newUser]);
//       newUser.id = result.insertId;
//       return done(null, newUser);
//     }
//   )
// );

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  let rows1 = await myConn.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  let rows2 = await myConn.query("SELECT * FROM clientes WHERE email = ?", [email]);
  let r = '';
  if (rows1[0]) {
    r = rows1[0]
  } else if (rows2[0]) {
    r = rows2[0]
  }
  done(null, r);
});


// passport.deserializeUser(async (id, done) => {
//   const rows = await myConn.query("SELECT * FROM usuarios WHERE id = ?", [id]);
//   done(null, rows[0]);
// });
