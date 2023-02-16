const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band and Musician Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });

    newBand = await Band.create({
      name: "Spice Ladies",
      genre: "Pop",
      showCount: 0,
    });

    newBand2 = await Band.create({
      name: "Spice Girls",
      genre: "Pop",
      showCount: 100,
    });

    newBand3 = Band.create({
      name: "collabBand",
      showCount: 1,
    });

    newMusician = await Musician.create({
      name: "Mel C",
      instrument: "Singer",
    });

    newMusician2 = await Musician.create({
      name: "Baby Spice",
      instrument: "Singer",
    });

    newSong = await Song.create({
      name: "Wannabe",
      year: 1996,
    });

    newSong2 = await Song.create({
      name: "Stop",
      year: 1997,
    });
  });

  test("can create a Band", async () => {
    expect(newBand).toBeInstanceOf(Band);
    expect(newBand.name).toBe("Spice Ladies");
    expect(newBand.genre).toBe("Pop");
    expect(newBand.showCount).toBe(0);
  });

  test("can update a Band", async () => {
    await newBand.update({ showCount: 1 });
    expect(newBand.showCount).toBe(1);
  });

  test("can delete a Band", async () => {
    await newBand.destroy();
    const allBands = await Band.findAll();
    expect(allBands.length).toEqual(2);
  });

  test("can create a Musician", async () => {
    expect(newMusician).toBeInstanceOf(Musician);
    expect(newMusician.name).toBe("Mel C");
    expect(newMusician.instrument).toBe("Singer");
  });

  test("Muscians associate with correct Band", async () => {
    await newBand2.addMember(newMusician);
    await newBand2.addMember(newMusician2);
    const bandMusicians = await newBand2.getMembers();

    expect(bandMusicians.length).toEqual(2);
    expect(bandMusicians[0]).toBeInstanceOf(Musician);
    expect(bandMusicians[0].name).toEqual("Mel C");
    expect(bandMusicians[1].name).toEqual("Baby Spice");
  });

  test("can create a song", async () => {
    expect(newSong).toBeInstanceOf(Song);
    expect(newSong.name).toEqual("Wannabe");
    expect(newSong.year).toEqual(1996);
  });

  test("can add Songs to Band", async () => {
    await newBand2.addSong([1, 2]);
    const bandSongs = await newBand2.getSongs();

    expect(bandSongs.length).toEqual(2);
  });

  test("can add Bands to Song", async () => {
    await newSong2.addBand(3);
    const songBands = await newSong2.getBands();

    expect(songBands.length).toEqual(2);
  });

  test("can eager load data", async () => {
    const bandsWithMembersAndSongs = await Band.findAll({
      include: [{ model: Musician, as: "members" }, { model: Song }],
    });

    expect(bandsWithMembersAndSongs.length).toEqual(2);
    expect(bandsWithMembersAndSongs[0].members.length).toEqual(2);
    expect(bandsWithMembersAndSongs[0].Songs.length).toEqual(2);
    expect(bandsWithMembersAndSongs[1].Songs.length).toEqual(1);
  });
});
