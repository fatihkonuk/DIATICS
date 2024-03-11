const Unit = require("./Unit");

class UnitManager {
  constructor() {
    this.unitList = [];
  }

  createUnit(type, gender, coords) {
    const newUnit = new Unit(this.unitList.length + 1, type, gender, coords);
    this.addUnit(newUnit);
    return newUnit;
  }

  getAllUnits() {
    return this.unitList;
  }

  getUnitsByType(type) {
    return this.unitList.filter((unit) => unit.type === type);
  }

  groupUnitsByType() {
    const groupedUnits = {};
    this.unitList.forEach((unit) => {
      const { type } = unit;
      if (!groupedUnits[type]) {
        groupedUnits[type] = [];
      }
      groupedUnits[type].push(unit);
    });
    return groupedUnits;
  }

  addUnit(unit) {
    this.unitList.push(unit);
  }

  deleteUnitById(id) {
    this.unitList = this.unitList.filter((unit) => unit.id !== id);
  }

  deleteManyUnit(unitList) {
    unitList.forEach((unit) => {
      this.deleteUnitById(unit.id);
    });
  }
}

module.exports = UnitManager;
