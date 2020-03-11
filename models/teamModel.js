const db = require("./con");
const bcrypyt = require("bcryptjs");

class Teams {
  constructor(id, name, password, win, loss, email) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.win = win;
    this.loss = loss;
    this.email = email;
  }

  async sigupTeam() {
    try {
      const response = await db.one(
        `INSERT INTO teams (name, password, win, loss, email)
            VALUES ($1, $2, $3, $4, $5)`,
        [this.name, this.password, this.win, this.loss, this.email]
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  checkPassword(hashedPassword) {
    return bcrypyt.compareSync(this.password, hashedPassword);
  }

  async loginTeam() {
    try {
      const response = await db.one(
        `SELECT id, name, email, password, win, loss FROM teams WHERE email = $1`,
        [this.email]
      );
      const isValid = this.checkPassword(response.password);
      const { id, name, email, win, loss } = response;
      return { id, name, email, win, loss, isValid };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = Teams;
