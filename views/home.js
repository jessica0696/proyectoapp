const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "asi si funciona",
    message: "hola mundo",
  });
});

module.exports = router;