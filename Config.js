const { unitTypes } = require("./types");

const Config = {
  canvasSize: { x: 500, y: 500 },
  endStep: 1000,
  units: [
    { type: unitTypes.SHEEP.type, count: 30, male: 15, female: 15 },
    { type: unitTypes.COW.type, count: 10, male: 5, female: 5 },
    { type: unitTypes.CHICKEN.type, count: 10, male: 0, female: 10 },
    { type: unitTypes.WOLF.type, count: 10, male: 5, female: 5 },
    { type: unitTypes.COCKEREL.type, count: 10, male: 10, female: 0 },
    { type: unitTypes.LION.type, count: 8, male: 4, female: 4 },
    { type: unitTypes.HUNTER.type, count: 1, male: 1, female: 0 },
  ],
};

module.exports = Config;
