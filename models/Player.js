const db = require("./con");

class Player {
  constructor(name, location, hand) {
    this.name = name;
    this.location = location;
    this.hand = hand;
  }

  static async getPlayerCount(teamID) {
    try {
      const response = await db.one(
        `SELECT player1city, player2city, player3city, player4city FROM game WHERE game.id = ${teamID};`
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  // this might need to change depending on posting and getting locations in database for the future.
  moveCities(city, potentialDestination) {
    let newLocation = {};
    for (let i = 0; i < city.connectedCities.length; i++) {
      if (city.connectedCities[i] === potentialDestination.name) {
        newLocation = potentialDestination;
        i = 15;
        this.location = newLocation;
        return true; //possibly needs to just return true for a check. Posting city achieves this result
      }
    }
    return false;
    console.log("Sorry, you couldn't move there!");
  }

  async updatePlayerCity(player, destination, teamID) {
    try {
      const response = await db.one(
        `UPDATE game SET ${player.name}city = ${destination.id} FROM teams WHERE game.id = ${teamID};`
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  static async getPlayerCity(playerNumber, teamID) {
    try {
      const location = await db.one(
        `SELECT ${playerNumber}city FROM game WHERE game.id = ${teamID};`
      );
      return location;
    } catch (e) {
      return e;
    }
  }

  async getPlayerHand(teamID) {
    try {
      const response = await db.one(
        `SELECT playerdeck FROM game WHERE game.id = ${teamID};`
      );
    } catch (e) {
      return e;
    }
  }

  async getTeamID(sessionID) {
    //this expects to recieve the Session id for the team to update the game database.
    try {
      const response = await db.one(
        `SELECT teams.id FROM teams WHERE teams.id = ${sessionID};`
      );
      return response.id;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Player;
