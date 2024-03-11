const UnitManager = require("./UnitManager");
const Config = require("./Config");
const { getUnitByType, getUnitTypeCount } = require("./types");
const Logger = require("./Logger");

class Game {
  constructor() {
    this.UnitManager = new UnitManager();
    this.step = 1;
    this.addedList = [];
    this.deletedList = [];
  }

  preStart() {
    const unitsInfo = Config.units;

    // Create all animals and hunters
    for (let i = 0; i < getUnitTypeCount(); i++) {
      const unitInfo = unitsInfo[i];
      for (let j = 0; j < unitInfo.count; j++) {
        const gender = j < unitInfo.male ? 0 : 1;
        this.UnitManager.createUnit(unitInfo.type, gender, getRandomCoords());
      }
    }

    // remove log file
    Logger.removeFile();
  }

  start() {
    this.preStart();

    this.writeConsole();

    this.update();
  }

  stop() {
    this.writeConsole();
  }

  update() {
    while (this.step !== Config.endStep) {
      this.moveUnits();
      this.checkUnits();
      this.writeFile();
      this.step++;
    }

    // The End
    this.stop();
  }

  moveUnits() {
    this.UnitManager.getAllUnits().forEach((unit) => {
      unit.Move();
    });
  }

  checkUnits() {
    this.addedList = [];
    this.deletedList = [];

    this.UnitManager.getAllUnits().forEach((unit) => {
      this.checkHunt(unit);
      this.checkReproduction(unit);
    });
  }

  checkHunt(unit) {
    const { type, coords } = unit;
    const unitInfo = getUnitByType(type);
    if (unitInfo.canHunt) {
      const enemieTypes = unitInfo.huntType;
      const huntRange = unitInfo.huntRange;

      const enemies = this.findEnemies(coords, huntRange, enemieTypes);
      this.deletedList.push(...enemies);
      this.UnitManager.deleteManyUnit(enemies);
    }
  }
  checkReproduction(unit) {
    const { type, coords, gender } = unit;

    const equalUnits = this.findEqualTypes(coords, type, gender);
    if (equalUnits.length !== 0) {
      equalUnits.forEach((unit) => {
        const newGender = Math.round(Math.random());
        const newUnit = this.UnitManager.createUnit(
          unit.type,
          newGender,
          getRandomCoords()
        );
        this.addedList.push(newUnit);
      });
    }
  }

  findEnemies(coords, huntRange, enemieTypes) {
    const enemies = this.UnitManager.getAllUnits().filter((unit) => {
      return (
        enemieTypes.includes(unit.type) &&
        Math.abs(unit.coords.x - coords.x) <= huntRange
      );
    });

    return enemies;
  }

  findEqualTypes(coords, type, gender) {
    const units = [];
    this.UnitManager.getAllUnits().forEach((unit) => {
      if (
        unit.type === type &&
        unit.gender !== gender &&
        Math.abs(unit.coords.x - coords.x) <= 3 &&
        Math.abs(unit.coords.y - coords.y) <= 3
      ) {
        units.push(unit);
      }
    });
    return units;
  }

  writeConsole() {
    const groupedUnits = this.UnitManager.groupUnitsByType();
    const log = {
      step: this.step,
      units: groupedUnits,
    };

    Logger.writeConsole(log);
  }

  writeFile() {
    const groupedUnits = this.UnitManager.groupUnitsByType();
    const groupedDeleted = this.groupItemsByType(this.deletedList);
    const groupedAdded = this.groupItemsByType(this.addedList);

    const log = {
      step: this.step,
      units: groupedUnits,
      deleted: groupedDeleted,
      added: groupedAdded,
    };

    Logger.writeFile(log);
  }

  groupItemsByType(items) {
    if (items.length == 0) return {};

    return items.reduce((grouped, unit) => {
      const { type } = unit;
      grouped[type] = grouped[type] || [];
      grouped[type].push(unit);
      return grouped;
    }, {});
  }
}

function getRandomCoords() {
  const xCoord = Math.round(Math.random() * Config.canvasSize.x);
  const yCoord = Math.round(Math.random() * Config.canvasSize.y);
  return { x: xCoord, y: yCoord };
}

module.exports = Game;
