const unitTypes = {
  SHEEP: {
    type: 1,
    name: "Koyun",
    moveSpeed: 2,
    canHunt: false,
  },
  COW: {
    type: 2,
    name: "İnek",
    moveSpeed: 2,
    canHunt: false,
  },
  CHICKEN: {
    type: 3,
    name: "Tavuk",
    moveSpeed: 1,
    canHunt: false,
  },
  WOLF: {
    type: 4,
    name: "Kurt",
    moveSpeed: 3,
    canHunt: true,
    huntType: [1, 3, 5],
    huntRange: 4,
  },
  COCKEREL: {
    type: 5,
    name: "Horoz",
    moveSpeed: 1,
    canHunt: false,
  },
  LION: {
    type: 6,
    name: "Aslan",
    moveSpeed: 4,
    canHunt: true,
    huntType: [1, 3],
    huntRange: 5,
  },
  HUNTER: {
    type: 7,
    name: "Avcı",
    moveSpeed: 1,
    canHunt: true,
    huntType: [1, 2, 3, 4, 5, 6],
    huntRange: 8,
  },
};

const getUnitByType = (type = 0) => {
  const unit = Object.values(unitTypes).find((unit) => unit.type == type);
  return unit;
};

const getUnitTypeCount = () => {
  return Object.keys(unitTypes).length;
};

module.exports = { 
    unitTypes,
    getUnitByType,
    getUnitTypeCount, 
};
