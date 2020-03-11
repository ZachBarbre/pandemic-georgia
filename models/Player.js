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
        return this.location;
      }
    }

    console.log("Sorry, you couldn't move there!");
  }

  async postPlayerCity(player, destination) {
    try {
      const response = await db.one(
        `UPDATE game SET ${player.name}city = ${destination.id} FROM teams WHERE game.id = teams.id;`
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  async getPlayerCity(player) {
    try {
      const location = await db.one(`SELECT ${player.name}city FROM game;`);
      console.log(location);
    } catch (e) {
      return e;
    }
  }

  async postLocation() {
    //connect to database.
    try {
      const response = await db.one(
        "INSERT INTO teams(name, password, win, loss, email) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
        ["benny", "brunhilda", 1, 4, "bebebfo"]
      );
      return response;
    } catch (e) {
      return e;
    }
  }

  async getLocation() {
    try {
      const response = await db.one(`SELECT * FROM teams`);
      console.log("THe response is", response);
      return response;
    } catch (e) {
      return e;
    }
  }
}

module.exports = Player;
