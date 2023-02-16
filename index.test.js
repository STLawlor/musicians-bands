const { sequelize } = require("./db");
const { Band, Musician } = require("./index");

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
      name: "Spice Girls",
      genre: "Pop",
      showCount: 100,
    });

    newMusician = await Musician.create({
      name: "Mel C",
      instrument: "Singer",
    });

    newMusician2 = await Musician.create({
      name: "Baby Spice",
      instrument: "Singer",
    });
  });

  test("can create a Band", async () => {
    expect(newBand).toBeInstanceOf(Band);
    expect(newBand.name).toBe("Spice Girls");
    expect(newBand.genre).toBe("Pop");
    expect(newBand.showCount).toBe(100);
  });

  test("can update a Band", async () => {
    await newBand.update({ showCount: 101 });
    expect(newBand.showCount).toBe(101);
  });

  test("can delete a Band", async () => {
    await newBand.destroy();
    const allBands = await Band.findAll();
    expect(allBands).toEqual([]);
  });

  test("can create a Musician", async () => {
    expect(newMusician).toBeInstanceOf(Musician);
    expect(newMusician.name).toBe("Mel C");
    expect(newMusician.instrument).toBe("Singer");
  });

  test("Muscians associate with correct Band", async () => {
    let newBand2 = await Band.create({
      name: "Spice Girls",
      genre: "Pop",
      showCount: 100,
    });

    await newBand2.addMusician(newMusician);
    await newBand2.addMusician(newMusician2);
    const bandMusicians = await newBand2.getMusicians();

    expect(bandMusicians.length).toEqual(2);
    expect(bandMusicians[0]).toBeInstanceOf(Musician);
    expect(bandMusicians[0].name).toEqual("Mel C");
    expect(bandMusicians[1].name).toEqual("Baby Spice");
  });
});
