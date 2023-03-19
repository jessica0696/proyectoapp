const express = require("express");
const app = express();
app.use(express.json());
const back = require("./views/index");
app.use("/", back);