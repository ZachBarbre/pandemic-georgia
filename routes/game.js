const express = require("express");
const router = express.Router();
const cityModel = require("../models/Cities");
const playerModel = require("../models/Player");
const teamModel = require("../models/teamModel");

const Dalton = new cityModel("dalton", 1, 0, ["Blairsville", "Atlanta"]);
const Blairsville = new cityModel("Blairsville", 2, 0, ["Dalton", "Athens"]);
const Atlanta = new cityModel("Atlanta", 3, 0, [
  "Dalton",
  "Athens",
  "Macon",
  "Columbus"
]);
const Athens = new cityModel("Athens", 4, 0, [
  "Blairsville",
  "Atlanta",
  "Augusta"
]);
const Augusta = new cityModel("Augusta", 5, 0, [
  "Athens",
  "Atlanta",
  "Savannah"
]);
const Columbus = new cityModel("Columbus", 6, 0, [
  "Atlanta",
  "Macon",
  "Albany"
]);
const Macon = new cityModel("Macon", 7, 0, [
  "Atlanta",
  "Columbus",
  "Albany",
  "Savannah"
]);
const Savannah = new cityModel("Savannah", 8, 0, ["Macon", "Valdosta"]);
const Albany = new cityModel("Albany", 9, 0, ["Columbus", "Macon", "Valdosta"]);
const Valdosta = new cityModel("Valdosta", 10, 0, ["Albany", "Savannah"]);

const setPlayerCity = playerCityNumber => {
  let playerCity = "";
  switch (true) {
    case playerCityNumber === 1:
      playerCity = Dalton;
      break;
    case playerCityNumber === 2:
      playerCity = Blairsville;
      break;
    case playerCityNumber === 3:
      playerCity = Atlanta;
      break;
    case playerCityNumber === 4:
      playerCity = Athens;
      break;
    case playerCityNumber === 5:
      playerCity = Augusta;
      break;
    case playerCityNumber === 6:
      playerCity = Columbus;
      break;
    case playerCityNumber === 7:
      playerCity = Macon;
      break;
    case playerCityNumber === 8:
      playerCity = Savannah;
      break;
    case playerCityNumber === 9:
      playerCity = Albany;
      break;
    case playerCityNumber === 10:
      playerCity = Valdosta;
      break;
  }
  return playerCity;
};

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

  // console.log(cityStatus);
  // console.log(playerLocations);
  // console.log(req.session);

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
  });
});

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
});

router.post("/play/athens", async (req, res) => {
  const userData = req.session;
  const playerTurn = 1;
  const playerCityRespose = await playerModel.getPlayerCity(
    `player${playerTurn}`,
    userData.user_id
  );
  const playerCityNumber = Object.values(playerCityRespose)[0];
  console.log("player city #", playerCityNumber);
  const player = new playerModel(`player${playerTurn}`, playerCityNumber, null);
  const playerCity = setPlayerCity(playerCityNumber);

  console.log("player city", playerCity);

  const canMove = player.moveCities(playerCity, Athens);
  console.log("can move", canMove);
  if (canMove) {
    const movePlayer = await player.updatePlayerCity(
      player,
      Athens,
      userData.user_id
    );
  }
  res.status(200).redirect("/game/play");
});

module.exports = router;
