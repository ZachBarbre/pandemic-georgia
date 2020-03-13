const express = require("express");
const router = express.Router();
const cityModel = require("../models/Cities");
const playerModel = require("../models/Player");
const teamModel = require("../models/teamModel");

router.get("/play", async function(req, res, next) {
  const teamData = req.session;
  const playerLocations = await playerModel.getPlayerCount(teamData.user_id);

  res.render("template", {
    locals: {
      title: "Pandemic Georgia",
      userData: teamData
    },
    partials: {
      partial: "game-partial"
    }
  });
});

router.get("/", async (req, res) => {
  res.render("template", {
    locals: {
      title: "create",
      userData: req.session
    },
    partials: {
      partial: "newgame-partial"
    }
  });
});

router.post("/", async (req, res) => {
  const userData = req.session;
  const { players } = req.body;
  console.log(userData);
  console.log(players);
  //const newGame = await cityModel.initCity();

  res.status(200).redirect("/game/play");
});

module.exports = router;
