require("dotenv").config();

const pgp = require("pg-promise")({
  query: function(e) {
    console.log("QUERY:", e.query);
  }
});
const option = {
  host: process.env["DB_HOST"],
  user: process.env["DB_NAME"],
  database: process.env["DB_NAME"],
  password: process.env["PASSWORD"]
};

const db = pgp(option);

module.exports = db;
