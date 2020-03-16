const express = require("express");
const router = express.Router();
const cityModel = require("../models/Cities");
const playerModel = require("../models/Player");
const teamModel = require("../models/teamModel");
const deckModel = require("../models/Deck");
const gameFunctions = require("../models/gamefunctions");

const Dalton = new cityModel("Dalton", 1, 0, ["Blairsville", "Atlanta"]);
const Blairsville = new cityModel("Blairsville", 2, 0, ["Dalton", "Athens"]);
const Atlanta = new cityModel("Atlanta", 3, 0, [
  "Dalton",
  "Athens",
  "Macon",
  "Columbus",
  "Augusta"
]);
const Athens = new cityModel("Athens", 4, 0, [
  "Blairsville",
  "Atlanta",
  "Augusta"
]);
const Augusta = new cityModel("Augusta", 5, 0, [
  "Athens",
  "Atlanta",
  "Savannah",
  "Macon"
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
  "Savannah",
  "Augusta"
]);
const Savannah = new cityModel("Savannah", 8, 0, ["Macon", "Valdosta"]);
const Albany = new cityModel("Albany", 9, 0, ["Columbus", "Macon", "Valdosta"]);
const Valdosta = new cityModel("Valdosta", 10, 0, ["Albany", "Savannah"]);

//Helper Functions
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

const setCurrentCity = cityName => {
  let currentCity = "";
  switch (true) {
    case cityName === "dalton":
      currentCity = Dalton;
      break;
    case cityName === "blairsville":
      currentCity = Blairsville;
      break;
    case cityName === "atlanta":
      currentCity = Atlanta;
      break;
    case cityName === "athens":
      currentCity = Athens;
      break;
    case cityName === "augusta":
      currentCity = Augusta;
      break;
    case cityName === "columbus":
      currentCity = Columbus;
      break;
    case cityName === "macon":
      currentCity = Macon;
      break;
    case cityName === "savannah":
      currentCity = Savannah;
      break;
    case cityName === "albany":
      currentCity = Albany;
      break;
    case cityName === "valdosta":
      currentCity = Valdosta;
      break;
  }
  return currentCity;
};

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

const cureCity = async (cityInstance, lowerCaseName, userData, cityNum) => {
  const gameState = await cityModel.getGame(userData.user_id);
  let cityinfect = lowerCaseName + "infect";
  switch (gameState.playerturn) {
    case 1:
      if (gameState.player1city === cityNum && gameState[cityinfect] > 0) {
        const cure = await cityInstance.removeInfect(
          lowerCaseName,
          userData.user_id
        );
      }
      break;
    case 2:
      if (gameState.player2city === cityNum && gameState[cityinfect] > 0) {
        const cure = await cityInstance.removeInfect(
          lowerCaseName,
          userData.user_id
        );
      }
      break;
    case 3:
      if (gameState.player3city === cityNum && gameState[cityinfect] > 0) {
        const cure = await cityInstance.removeInfect(
          lowerCaseName,
          userData.user_id
        );
      }
      break;
    case 4:
      if (gameState.player4city === cityNum && gameState[cityinfect] > 0) {
        const cure = await cityInstance.removeInfect(
          lowerCaseName,
          userData.user_id
        );
      }
      break;
  }
};

router.get("/play", async (req, res, next) => {
  const cityStatus = await cityModel.getGame(req.session.user_id);
  const playerLocations = await playerModel.getPlayerCount(req.session.user_id);
  const playerDeck = await deckModel.getPlayerDeck(req.session.user_id);
  //console.log("the game deck is:", playerDeck);
  console.log(cityStatus);
  // console.log(playerLocations);
  // console.log(req.session);

  res.render("template", {
    locals: {
      title: "Pandemic Georgia",
      userData: req.session,
      playerLocations: Object.values(playerLocations),
      cityStatus: cityStatus,
      playerDeck: playerDeck
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
  const {
    players
  } = req.body;
  if (userData.game_exists) {
    const deleteOldGame = await cityModel.deleteGame(userData.user_id);
  }
  const playerArray = createPlayerArray(players);

  // const newGame = await cityModel.initCity(userData.user_id, playerArray);


  //deck initialization: creation, adding epidemics, shuffling and pushing to DB.
  //leaving console logs in there to see th steps in action if you like.

  const deckInit = await new deckModel().buildDeck();
  //console.log("this is the new deck:", deckInit);
  const addingEpidemics = await new deckModel().addEpidemics(deckInit);
  //console.log("deck with epidemics in it:", addingEpidemics);
  const completedDeck = await new deckModel().shuffleTwo(addingEpidemics);
  //console.log("this is the complete and shuffled player deck:", completedDeck);
  //const postDeck = await deckModel.postPlayerDeck(completedDeck, userData.user_id);
  const newGame = await cityModel.initCity(userData.user_id, playerArray, completedDeck);
  //console.log("Created Game with id:", newGame);

  res.status(200).redirect("/game/play");
});

// Post Route Generalized for Movement and Cures.
router.post(
  "/play/:city?",
  async (req, res, next) => {
      const userData = req.session;
      let playerTurn = await playerModel.getCurrentPlayer(userData.user_id);
      playerTurn = playerTurn.playerturn;
      const city = req.params.city;
      //console.log("params city", city);
      const clickedCity = setCurrentCity(city);
      console.log("clicked city;", clickedCity);
      const playerCityRespose = await playerModel.getPlayerCity(
        `player${playerTurn}`,
        userData.user_id
      );
      const playerCityNumber = Object.values(playerCityRespose)[0];
      console.log("player city #", playerCityNumber);
      const player = new playerModel(
        `player${playerTurn}`,
        playerCityNumber,
        null
      );
      const playerCity = setPlayerCity(playerCityNumber);
      console.log("player city", playerCity);

      if (playerCity !== clickedCity) {
        const canMove = player.moveCities(playerCity, clickedCity);
        console.log("can move", canMove);
        if (canMove) {
          const movePlayer = await player.updatePlayerCity(
            player,
            clickedCity,
            userData.user_id
          );
          const recordMove = await playerModel.recordMove(playerTurn, playerCity.name, clickedCity.name, userData.user_id);
        }
      }
      if (playerCity === clickedCity) {
        const cure = await cureCity(
          clickedCity,
          city,
          userData,
          playerCityNumber
        );
        const recordCure = await playerModel.recordCure(playerTurn, clickedCity.name, userData.user_id);
      }

      const game = await cityModel.getGame(userData.user_id);
      if (game.actions === 1) {
        const decreaseDay = await gameFunctions.decreaseDay(userData.user_id);
      }
      const action = await playerModel.removeAction(userData.user_id);

      next();
    },
    (req, res) => {
      res.status(200).redirect("back");
    }
);

module.exports = router;