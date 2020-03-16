const express = require("express");
const router = express.Router();
const teamModel = require("../models/teamModel");
const bcrypt = require("bcryptjs");

router.get("/", async function(req, res, next) {
  res.render("template", {
    locals: {
      title: "Play Pandemic",
      userData: req.session
    },
    partials: {
      partial: "victory-partial"
    }
  });
});

module.exports = router;
