const fs = require("fs");
const { getUnitByType } = require("./types");

const fileName = "result.txt";

const removeFile = () => {
  if (fs.existsSync(fileName)) {
    fs.rmSync(fileName);
  }
};

const writeFile = (log) => {
  fs.writeFileSync(fileName, `**** Adım: ${log.step} ****\n`, { flag: "a" });

  const unitCounts = Object.keys(log.units)
    .map((type) => `${getUnitByType(type).name}: ${log.units[type].length}`)
    .join('\n');

  const addedUnits = formatLogItems(log.added, 'Eklenen');
  const deletedUnits = formatLogItems(log.deleted, 'Silinen');

  const logText = `${unitCounts}\n${addedUnits}\n${deletedUnits}\n\n`;
  
  fs.writeFileSync(fileName, logText, { flag: "a" });
};

const writeConsole = (log) => {
  const unitCounts = Object.keys(log.units)
  .map((type) => `${getUnitByType(type).name}: ${log.units[type].length}`)
  .join('\n');

  console.log(`\n**** ${log.step}. Adım ****`);
  console.log(unitCounts);
}

const formatLogItems = (items, label) => {
  let logText = `${label}: `;
  Object.keys(items).forEach((type) => {
    logText += `(${getUnitByType(type).name}: ${items[type].length}) `;
  });
  return logText;
};

module.exports = { writeFile, removeFile, writeConsole };
