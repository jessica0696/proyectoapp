const express = require("express");
const router = express.Router();

router.get("./mapa/mapa", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly! ",

  });
});

module.exports = router;