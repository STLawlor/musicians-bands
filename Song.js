const { sequelize } = require("./db.js");
const { Sequelize } = require("sequelize");

const Song = sequelize.define("Song", {
  name: Sequelize.STRING,
  year: Sequelize.NUMBER,
});

module.exports = { Song };