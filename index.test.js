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
    const newMusician = await Musician.create({
      name: "Mel C",
      instrument: "Singer",
    });
    expect(newMusician).toBeInstanceOf(Musician);
    expect(newMusician.name).toBe("Mel C");
    expect(newMusician.instrument).toBe("Singer");
  });
});
