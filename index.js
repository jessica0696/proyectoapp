// Import packages
const express = require("express");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const path = require("path");
const bodyParser = require('body-parser');
const sqlite3 = require("sqlite3").verbose();
const home = require("./views/home");

// Middlewares
const app = express();
app.use(express.json());
// Configuración del servidor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/home", home);

//login procedure
app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => { res.redirect("/prin"); });


// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));