const db = require("./con");

class City {
  constructor(name, id, infectedCounter, connectedCities) {
    this.name = name;
    this.id = id;
    this.infectedCounter = infectedCounter;
    this.connectedCities = connectedCities;
  }

  async postInfect(city, teamID) {
    //updates database with new infected total.
    try {
      const value = await this.getInfect(city);
      const bit = value[Object.keys(value)[0]] + 1;
      const post = await db.one(
        `UPDATE game SET ${city.name}infect = $1 FROM teams WHERE game.id = ${teamID};`,
        [bit]
      );
      console.log("The response is", response);
      return post;
    } catch (e) {
      return e;
    }
  }

  static async getGame(teamID) {
    try {
      const response = await db.one(`SELECT * FROM game WHERE id = ${teamID};`);
      return response;
    } catch (e) {
      return e;
    }
  }

  async getInfect(city, teamID) {
    // getter from database for infected total.
    try {
      const response = await db.one(
        `SELECT game.${city}infect FROM game WHERE game.id = ${teamID};`
      );
      console.log("THe response is", response);
      return response;
    } catch (e) {
      return e;
    }
  }

  async removeInfect(city, teamID) {
    //updates database with new infected total.
    try {
      const value = await this.getInfect(city, teamID);
      //console.log("this is the value:", value);
      const bit = value[Object.keys(value)[0]] - 1;
      //console.log("the bit is:", bit);
      const post = await db.one(
        `UPDATE game SET ${city}infect = $1 FROM teams WHERE game.id = ${teamID};`,
        [bit]
      );
      // console.log("The response is", response);
      // console.log("The post is:", post);
      return post;
    } catch (e) {
      return e;
    }
  }

  static async initCity(teamID, playerArray) {
    const response = await db.one(
      `INSERT INTO game(id, daltoninfect, blairsvilleinfect, atlantainfect, athensinfect, augustainfect, columbusinfect, maconinfect, savannahinfect, albanyinfect, valdostainfect, player1hand, player2hand, player3hand, player4hand, cure1, cure2, cure3, cure4, playerdeck, infectdeck, player1city, player2city, player3city, player4city, infectrate, playeractions, outbreak, playerturn, actions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30) RETURNING id`,
      [
        teamID,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        [],
        [],
        [],
        [],
        false,
        false,
        false,
        false,
        [],
        [],
        playerArray[0],
        playerArray[1],
        playerArray[2],
        playerArray[3],
        0,
        4,
        0,
        1,
        4
      ]
    );
    return response;
  }

  static async deleteGame(teamID) {
    try {
      const response = await db.one(`DELETE FROM game WHERE id = ${teamID};`);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  static async gameExists(teamID) {
    try {
      const response = await db.one(
        `SELECT EXISTS(SELECT id FROM game WHERE id=${teamID});;`
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = City;
