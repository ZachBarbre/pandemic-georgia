var express = require("express");
var router = express.Router();

router.get("/", async function(req, res, next) {
  res.render("template", {
    locals: {
      title: "Game"
    },
    partials: {
      partial: "game-partial"
    }
  });
});

module.exports = router;
