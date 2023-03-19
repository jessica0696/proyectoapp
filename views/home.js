const express = require("express");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const path = require("path");
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();

// Creación de servidor con Expresss
const app = express();

// Configuración del servidor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Conexión a la base de datos
//const db_name = path.join(__dirname, "data", "apptest.db");
const db = require('./data/db');

app.use(session({
  secret: "test",
  resave: true,
  saveUninitialized: true

}));
passport.use(new passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password"
},
  (user, password, done) => {

    db.get("select * from user where username = ? and password = ?",
      user, password,
      (err) => {
        if (err)
          return done("invalid login or password!!!");
        else
          return done(null, user);
      });
  }));
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//login form
app.get("/", (req, res) => {
  res.render("login");
})


//login procedure
app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => { res.redirect("/prin"); });


//register form
app.get("/register", (req, res) => {
  res.render("signup");
});

//register procedure
app.post("/register", (req, res) => {
  //{failureRedirect: '/register'},
  db.run("insert into user(id, username, password) values(?, ?, ?)",
    Date.now(),
    req.user,
    req.body.password,
    (err) => {
      if (err)
        res.send(err);
      else
        res.redirect("/login");
    });

});

// Rutas

app.get("/login", (req, res) => {
  res.render("login");
});
// Get /pagina principal
app.get("/prin", (req, res) => {
  res.render("prin");
});

// Get /signup
app.get("/signup", (req, res) => {
  res.render("signup");
});

// GET /about

app.get("/about", (req, res) => {
  res.render("about");
});

// GET /conoce

app.get("/conoce", (req, res) => {
  res.render("conoce");
});

// GET /salir
app.get("/salir", (req, res) => {
  res.render("salir");
});

// GET /data
app.get("/data", (req, res) => {
  const test = {
    titre: "Test",
    items: ["uno", "dos", "tres"]
  };
  res.render("data", { model: test });
});

// GET /pines
app.get("/livres", (req, res) => {
  const sql = "SELECT * FROM Livres ORDER BY Titre";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("livres", { model: rows });
  });
});

// GET /create
app.get("/create", (req, res) => {
  res.render("create", { model: {} });
});

// POST /create
app.post("/create", (req, res) => {
  const sql = "INSERT INTO Livres (Titre, Auteur, Commentaires) VALUES (?, ?, ?)";
  const book = [req.body.Titre, req.body.Auteur, req.body.Commentaires];
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/livres");
  });
});

// GET /edit/
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Livres WHERE Livre_ID = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("edit", { model: row });
  });
});

// POST /edit/
app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  const book = [req.body.Titre, req.body.Auteur, req.body.Commentaires, id];
  const sql = "UPDATE Livres SET Titre = ?, Auteur = ?, Commentaires = ? WHERE (Livre_ID = ?)";
  db.run(sql, book, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/livres");
  });
});

// GET /delete/
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM Livres WHERE Livre_ID = ?";
  db.get(sql, id, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("delete", { model: row });
  });
});

// POST /delete/
app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Livres WHERE Livre_ID = ?";
  db.run(sql, id, err => {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/livres");
  });
});




app.listen(5000, () => {
    console.log("(http://localhost:5000/)");
});