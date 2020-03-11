const express = require("express");
const router = express.Router();
// const userModel = require("../models/userModel")

router.get("/", async function(req, res, next) {
  res.render("template", {
    locals: {
      title: "Login"
    },
    partials: {
      partial: "login-partial"
    }
  });
});

module.exports = router;
