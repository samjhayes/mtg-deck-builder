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

function remapOracle(json) {
  const cards = json.filter(card => card.image_uris !== undefined);
  const remapped = cards.map(card => ({
    id: card.oracle_id,
    name: card.name,
    mana: card.mana_cost,
    cmc: card.cmc,
    type: card.type_line,
    keywords: card.keywords,
    image: card.image_uris.normal,
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
