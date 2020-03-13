const express = require("express");
const router = express.Router();
const cityModel = require("../models/Cities");
const playerModel = require("../models/Player");
const teamModel = require("../models/teamModel");


//Helper Functions
const createPlayerArray = playerNumber => {
  let playerArray = [];
  for (let i = 1; i <= 4; i++) {
    if (i <= playerNumber) {
      playerArray.push(3);
    } else {
      playerArray.push(null);
    }
  }
  return playerArray;
};



router.get("/play", async (req, res, next) => {

  const cityStatus = await cityModel.getGame(req.session.user_id);

  const playerLocations = await playerModel.getPlayerCount(req.session.user_id);

  console.log(cityStatus);
  console.log(playerLocations);
  console.log(req.session);



  res.render("template", {
    locals: {
      title: "Pandemic Georgia",
      userData: req.session,
      playerLocations: Object.values(playerLocations),
      cityStatus: cityStatus
    },
    partials: {
      partial: "game-partial"
    }
  });
});

router.get("/", async (req, res) => {
  const teamData = req.session;
  const gameExists = await cityModel.gameExists(teamData.user_id);
  req.session.game_exists = gameExists.exists;

  res.render("template", {
    locals: {
      title: "Pandemic Georgia",
      userData: teamData,
      gameExists: gameExists.exists
    },
    partials: {
      partial: "newgame-partial"
    }

  })
})

router.post("/", async (req, res) => {
  const userData = req.session;
  const { players } = req.body;
  if (userData.game_exists) {
    const deleteOldGame = await cityModel.deleteGame(userData.user_id);
  }
  const playerArray = createPlayerArray(players);
  const newGame = await cityModel.initCity(userData.user_id, playerArray);
  console.log("Created Game with id:", newGame);

  //need to initalized deck and player hands here

  res.status(200).redirect("/game/play");
})

module.exports = router;