const db = require("./con");

class Player {
  constructor(name, location, hand) {
    this.name = name;
    this.location = location;
    this.hand = hand;
  }

  // this might need to change depending on posting and getting locations in database for the future.
  moveCities(city, potentialDestination) {
    let newLocation = {};
    for (let i = 0; i < city.connectedCities.length; i++) {
      if (city.connectedCities[i] === potentialDestination.name) {
        newLocation = potentialDestination;
        i = 15;
        this.location = newLocation;
        return this.location; //possibly needs to just return true for a check. Posting city achieves this result
      }
    }
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

  async getPlayerCity(player, teamID) {
    try {
      const location = await db.one(
        `SELECT ${player.name}city FROM game WHERE game.id = ${teamID};`
      );
      console.log(location);
    } catch (e) {
      return e;
    }
  }

  async getPlayerHand(teamID) {
    try {
      const response = await db.one(
        `SELECT playerdeck FROM game WHERE game.id = ${teamID};`
      );
      console.log(response);
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
      console.log(response.id);
      return response.id;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Player;
