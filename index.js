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

// Routes
app.use("/home", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));