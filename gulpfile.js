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
      // Handle error
      console.error(error);
      cb();
    });
}

function scryfallOracleCards(uri, cb) {
  fetch(uri)
    .then(response => response.json())
    .then(response => {
      fs.writeFileSync('./dist/cards.json', JSON.stringify(response));
      cb();
    })
    .catch(error => {
      // Handle error
      console.error(error);
      cb();
    });
}

exports.default = scryfall;
