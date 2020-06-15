const fetch = require('node-fetch');
const fs = require('fs');

function scryfall(cb) {
  const endpoint = 'https://api.scryfall.com/bulk-data';

  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      const { data } = response;

      const bulkOracleCards = data.find(
        bulkData => bulkData.type === 'oracle_cards'
      );

      if (bulkOracleCards && bulkOracleCards.download_uri) {
        scryfallOracleCards(bulkOracleCards.download_uri, cb);
      }
    })
    .catch(error => {
      console.error(error);
      cb();
    });
}

function scryfallOracleCards(uri, cb) {
  fetch(uri)
    .then(response => response.json())
    .then(response => {
      fs.writeFileSync(
        './src/assets/oracle.json',
        JSON.stringify(response, null, 2)
      );
      remapCards(response, cb);
      cb();
    })
    .catch(error => {
      console.error(error);
      cb();
    });
}

function remapCards(data, cb) {
  let cards = data.filter(card => card.image_uris !== undefined);
  cards = cards.map(card => ({
    id: card.id,
    name: card.name,
    mana_cost: card.mana_cost,
    type_line: card.type_line,
    oracle_text: card.oracle_text,
    image: card.image_uris.normal,
  }));
  fs.writeFileSync('./src/assets/oracle.min.json', JSON.stringify(cards));
  cb();
}

exports.default = scryfall;
