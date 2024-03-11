const { getUnitByType } = require("./types");
const Config = require("./Config");

class Unit {
  constructor(id, type, gender, coords) {
    this.id = id;
    this.type = type;
    this.gender = gender;
    this.coords = coords;
  }

  Move() {
    const { moveSpeed } = getUnitByType(this.type);
    const direction = Math.round(Math.random()); // 0: x || 1: y
    const moveDirection = Math.round(Math.random()) ? 1 : -1;

    if (direction === 0) {
      this.coords.x = clamp(this.coords.x + moveSpeed * moveDirection, 0, Config.canvasSize.x);
    } else {
      this.coords.y = clamp(this.coords.y + moveSpeed * moveDirection, 0, Config.canvasSize.y);
    }
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = Unit;
