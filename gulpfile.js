const fetch = require('node-fetch');
const fs = require('fs');

const oracleJsonPath = './src/assets/oracle.json';
const oracleMinJsonPath = './src/assets/oracle.min.json';

function download(cb) {
  const endpoint = 'https://api.scryfall.com/bulk-data';
  fetch(endpoint)
    .then(response => response.json())
    .then(response => {
      const { data } = response;
      const bulkOracle = data.find(
        bulkData => bulkData.type === 'oracle_cards'
      );
      if (bulkOracle && bulkOracle.download_uri) {
        downloadOracle(bulkOracle.download_uri, cb);
      }
    })
    .catch(error => {
      console.error(error);
      cb();
    });
}

function downloadOracle(uri, cb) {
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

function remapOracle(json) {
  const cards = filterOracle(json);
  const remapped = cards.map(card => ({
    id: card.oracle_id,
    n: card.name,
    cc: card.cmc,
    k: card.keywords,
    i: processImages(card),
    mc: processManaCost(card),
    c: processColors(card.color_identity),
    t: processType(card.type_line),
  }));
  return JSON.stringify(remapped);
}

function filterOracle(json) {
  return json.filter(
    card =>
      card.type_line !== 'Card' &&
      !['scheme', 'token'].includes(card.layout) &&
      (card.image_uris !== undefined ||
        (card.card_faces && card.card_faces[0].image_uris !== undefined))
  );
}

function processImages(card) {
  const { image_uris, card_faces } = card;
  let images = [];
  if (image_uris) {
    images.push(image_uris.normal);
  } else if (card_faces) {
    for (let i = 0; i < card_faces.length; i += 1) {
      const face = card_faces[i];
      images.push(face.image_uris.normal);
    }
  }
  return images;
}

function processManaCost(card) {
  const { mana_cost, card_faces } = card;
  let costsOut = [];
  if (mana_cost) {
    costsOut.push(...formatManaCosts(mana_cost));
  } else if (card_faces) {
    for (let i = 0; i < card_faces.length; i += 1) {
      const face = card_faces[i];
      if (face.mana_cost) {
        costsOut.push(...formatManaCosts(face.mana_cost));
      } else {
        costsOut.push([]);
      }
    }
  }
  return costsOut;
}

function formatManaCosts(manaCost) {
  const costsOut = [];
  manaCost.split(' // ').forEach(cost => {
    const processed = cost
      .trim()
      .toLowerCase()
      .slice(1, cost.length - 1)
      .replace(/\//g, '')
      .split('}{');
    costsOut.push(processed);
  });
  return costsOut;
}

function processColors(colors) {
  const lower = [];
  for (let i = 0; i < colors.length; i += 1) {
    lower[i] = colors[i].toLowerCase();
  }
  return lower;
}

function processType(type) {
  return type.split(' // ');
}

exports.default = download;
exports.download = download;
exports.remap = remap;
