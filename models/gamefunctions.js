const db = require("./con");

async function incrementInfection(oldNumber, teamsID) {
  try {
    const newNumber = oldNumber + 1;
    const value = await db.one(
      `UPDATE game.infection SET outbreak = ${newNumber} FROM teams WHERE game.id = ${teamsID};`
    );
    return value;
  } catch (e) {
    return e;
  }
}

async function incrementOutbreak(oldNumber, teamsID) {
  const newNumber = oldNumber + 1;
  const value = await db.one(
    `UPDATE game.outbreak SET outbreak = ${newNumber} FROM teams WHERE game.id = ${teamsID};`
  );
}

async function getInfection(teamsID) {
  try {
    const response = await db.one(
      `SELECT game.infectionrate FROM teams WHERE game.id = ${teamsID};`
    );
    return response;
  } catch (e) {
    return e;
  }
}

async function getOutbreak(teamsID) {
  try {
    const response = await db.one(
      `SELECT game.outbreak FROM teams WHERE game.id = ${teamsID};`
    );
    return response;
  } catch (e) {
    return e;
  }
}
