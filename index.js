const { Band } = require("./Band");
const { Musician } = require("./Musician");
const { Song } = require("./Song");

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsToMany(Band, {through: "song_bands"});
Band.belongsToMany(Song, {through: "song_bands"});

module.exports = {
  Band,
  Musician,
  Song
};
