const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly! ",

  });
});
<li class="nav-item">
<a class="nav-link" href="./mapa/mapa.html">mapa</a>
</li>
module.exports = router;