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
const Athens = new cityModel("Athens", 4, 0, ["Blairsville", "Atlanta", "Augusta"]);
const Augusta = new cityModel("Augusta", 5, 0, ["Athens", "Atlanta", "Savannah"]);
const Columbus = new cityModel("Columbus", 6, 0, ["Atlanta", "Macon", "Albany"]);
const Macon = new cityModel("Macon", 7, 0, [
  "Atlanta",
  "Columbus",
  "Albany",
  "Savannah"
]);
const Savannah = new cityModel("Savannah", 8, 0, ["Macon", "Valdosta"]);
const Albany = new cityModel("Albany", 9, 0, ["Columbus", "Macon", "Valdosta"]);
const Valdosta = new cityModel("Valdosta", 10, 0, ["Albany", "Savannah"]);

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

  })
})

router.post("/", async (req, res) => {
  const userData = req.session;
  const {
    players
  } = req.body;
  if (userData.game_exists) {
    const deleteOldGame = await cityModel.deleteGame(userData.user_id);
  }
  const playerArray = createPlayerArray(players);
  const newGame = await cityModel.initCity(userData.user_id, playerArray);
  console.log("Created Game with id:", newGame);

  //need to initalized deck and player hands here

  res.status(200).redirect("/game/play");
})

router.post("/play/atlanta", async (req, res) => {
  const userData = req.session;
  const gameState = await cityModel.getGame(req.session.user_id);
  switch (gameState.playerturn) {
    case 1:
      if (gameState.player1city === 3 && gameState.atlantainfect > 0) {
        const cureATL = await Atlanta.removeInfect("atlanta", userData.user_id);
      }
      break;
    case 2:
      if (gameState.player2city === 3 && gameState.atlantainfect > 0) {
        const cureATL = await Atlanta.removeInfect("atlanta", userData.user_id);
      }
      break;
    case 3:
      if (gameState.player3city === 3 && gameState.atlantainfect > 0) {
        const cureATL = await Atlanta.removeInfect("atlanta", userData.user_id);
      }
      break;
    case 4:
      if (gameState.player4city === 3 && gameState.atlantainfect > 0) {
        const cureATL = await Atlanta.removeInfect("atlanta", userData.user_id);
      }
      break;
  }
  res.status(200).redirect("/game/play");
});

router.post("/play/dalton", async (req, res) => {
  const userData = req.session;
  const gameState = await cityModel.getGame(req.session.user_id);
  switch (gameState.playerturn) {
    case 1:
      if (gameState.player1city === 1 && gameState.daltoninfect > 0) {
        const cureDalton = await Dalton.removeInfect("dalton", userData.user_id);
      }
      break;
    case 2:
      if (gameState.player2city === 1 && gameState.daltoninfect > 0) {
        const cureDalton = await Dalton.removeInfect("dalton", userData.user_id);
      }
      break;
    case 3:
      if (gameState.player3city === 1 && gameState.daltoninfect > 0) {
        const cureDalton = await Dalton.removeInfect("dalton", userData.user_id);
      }
      break;
    case 4:
      if (gameState.player4city === 1 && gameState.daltoninfect > 0) {
        const cureDalton = await Dalton.removeInfect("dalton", userData.user_id);
      }
      break;
  }
  res.status(200).redirect("/game/play");
});

router.post("/play/blairsville", async (req, res) => {
  const userData = req.session;
  const gameState = await cityModel.getGame(req.session.user_id);
  switch (gameState.playerturn) {
    case 1:
      if (gameState.player1city === 2 && gameState.blairsvilleinfect > 0) {
        const cureBV = await Blairsville.removeInfect("blairsville", userData.user_id);
      }
      break;
    case 2:
      if (gameState.player2city === 2 && gameState.blairsvilleinfect > 0) {
        const cureBV = await Blairsville.removeInfect("blairsville", userData.user_id);
      }
      break;
    case 3:
      if (gameState.player3city === 2 && gameState.blairsvilleinfect > 0) {
        const cureBV = await Blairsville.removeInfect("blairsville", userData.user_id);
      }
      break;
    case 4:
      if (gameState.player4city === 2 && gameState.blairsvilleinfect > 0) {
        const cureBV = await Blairsville.removeInfect("blairsville", userData.user_id);
      }
      break;
  }
  res.status(200).redirect("/game/play");
});

router.post("/play/athens", async (req, res) => {
  const userData = req.session;
  const gameState = await cityModel.getGame(req.session.user_id);
  switch (gameState.playerturn) {
    case 1:
      if (gameState.player1city === 4 && gameState.athensinfect > 0) {
        const cureAthens = await Athens.removeInfect("athens", userData.user_id);
      }
      break;
    case 2:
      if (gameState.player2city === 4 && gameState.athensinfect > 0) {
        const cureAthens = await Athens.removeInfect("athens", userData.user_id);
      }
      break;
    case 3:
      if (gameState.player3city === 4 && gameState.athensinfect > 0) {
        const cureAthens = await Athens.removeInfect("athens", userData.user_id);
      }
      break;
    case 4:
      if (gameState.player4city === 4 && gameState.athensinfect > 0) {
        const cureAthens = await Athens.removeInfect("athens", userData.user_id);
      }
      break;
  }
  res.status(200).redirect("/game/play");
});



module.exports = router;