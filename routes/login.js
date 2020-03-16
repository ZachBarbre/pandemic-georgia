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
      partial: "login-partial"
    }
  });
});

router.get("/signup", async function(req, res, next) {
  res.render("template", {
    locals: {
      title: "Signup",
      userData: req.session
    },
    partials: {
      partial: "signup-partial"
    }
  });
});

router.post("/signup", async (req, res, next) => {
  const { teamname, email, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const team = new teamModel(null, teamname, hash, null, null, email);
  team.sigupTeam();
  res.status(200).redirect("/");
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  const team = new teamModel(null, null, password, null, null, email);
  const loginResponse = await team.loginTeam();
  if (loginResponse.isValid === true) {
    req.session.is_logged_in = true;
    req.session.user_id = loginResponse.id;
    req.session.teamname = loginResponse.name;
    req.session.email = loginResponse.email;
    req.session.win = loginResponse.win;
    req.session.loss = loginResponse.loss;

    res.status(200).redirect("/game");
  } else {
    res.status(200).redirect("/login/signup");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).redirect("/");
});

module.exports = router;
