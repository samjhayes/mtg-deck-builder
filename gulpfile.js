const fetch = require('node-fetch');
const fs = require('fs');

const oracleJsonPath = './src/assets/oracle.json';
const oracleMinJsonPath = './src/assets/oracle.min.json';

function scryfall(cb) {
  const endpoint = 'https://api.scryfall.com/bulk-data';
  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      const { data } = response;
      const bulkOracle = data.find(
        bulkData => bulkData.type === 'oracle_cards'
      );
      if (bulkOracle && bulkOracle.download_uri) {
        scryfallOracle(bulkOracle.download_uri, cb);
      }
    })
    .catch(error => {
      console.error(error);
      cb();
    });
}

function scryfallOracle(uri, cb) {
  fetch(uri)
    .then(response => response.json())
    .then(response => {
      const json = JSON.stringify(response, null, 2);
      const remapped = remapOracle(response);
      fs.writeFileSync(oracleJsonPath, json);
      fs.writeFileSync(oracleMinJsonPath, remapped);
      cb();
    })
    .catch(error => {
      console.error(error);
      cb();
    });
}

function manaCostToArray(manaCost) {
  if (manaCost) {
    const manaCostArr = manaCost
      .trim()
      .toLowerCase()
      .slice(1, manaCost.length - 1)
      .replace(/ /g, '')
      .replace(/\/\//g, '\\')
      .replace(/\//g, '')
      .replace(/\\/g, '{/}')
      .split('}{');
    return manaCostArr;
  }
  return [];
}

function colorsToLowerCase(colors) {
  const lower = [];
  for (let i = 0; i < colors.length; i += 1) {
    lower[i] = colors[i].toLowerCase();
  }
  return lower;
}

function remapOracle(json) {
  const cards = json.filter(
    card => card.image_uris !== undefined && card.type_line !== 'Card'
  );
  const remapped = cards.map(card => ({
    id: card.oracle_id,
    name: card.name,
    mc: manaCostToArray(card.mana_cost),
    cmc: card.cmc,
    col: colorsToLowerCase(card.color_identity),
    type: card.type_line,
    kw: card.keywords,
    img: card.image_uris.normal,
  }));
  return JSON.stringify(remapped);
}

function remap(cb) {
  fs.readFile(oracleJsonPath, function(error, data) {
    if (!error) {
      const json = JSON.parse(data.toString());
      const remapped = remapOracle(json);
      fs.writeFileSync(oracleMinJsonPath, remapped);
    } else {
      console.error(error);
    }
    cb();
  });
}

exports.default = scryfall;
exports.remap = remap;
