export const downloadJSON = (obj, filename) => {
  const data = JSON.stringify(obj, null, 2);
  const type = 'application/json';
  const blob = new Blob([data], { type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const getCardDataById = (data, id) => data.find(card => card.id === id);

export const getCardDataByName = (data, name) =>
  data.find(card => {
    const lowerName = name.toLowerCase();
    const lowerCardName = card.name.toLowerCase();
    return (
      lowerCardName === lowerName ||
      lowerCardName.split(' // ')[0] === lowerName
    );
  });

export const getSeparateMainAndSideboard = cards => {
  const mainCards = [];
  const sideboardCards = [];

  cards.forEach(card => {
    if (card.mainCount) {
      mainCards.push({ ...card, count: card.mainCount });
    }

    if (card.sideboardCount) {
      sideboardCards.push({ ...card, count: card.sideboardCount });
    }
  });

  return {
    mainCards,
    sideboardCards,
  };
};

export const getTypeFromTypeLine = typeLine => {
  const lower = typeLine.toLowerCase();
  if (lower.includes('land')) {
    return 'land';
  }
  if (lower.includes('token')) {
    return 'token';
  }
  if (lower.includes('creature') || lower.includes('summon')) {
    return 'creature';
  }
  if (lower.includes('artifact')) {
    return 'artifact';
  }
  if (lower.includes('planeswalker')) {
    return 'planeswalker';
  }
  if (lower.includes('instant') || lower.includes('interrupt')) {
    return 'instant';
  }
  if (
    lower.includes('sorcery') ||
    lower.includes('enchantment') ||
    lower.includes('enchant creature')
  ) {
    return 'sorcery';
  }
  return 'unknown';
};

export const getTypesFromTypeLines = typeLines => {
  const types = [];
  for (let i = 0; i < typeLines.length; i += 1) {
    const type = typeLines[i];
    types.push(getTypeFromTypeLine(type));
  }
  return types;
};

export const getTotalCardCount = cards => {
  let count = 0;
  cards.forEach(obj => (count += obj.count));
  return count;
};

export const sortCardsByCMC = cards =>
  cards.sort(function(a, b) {
    // Sort lands to the bottom
    if (a.types[0] === 'land' && b.types[0] !== 'land') return 1;
    if (a.types[0] !== 'land' && b.types[0] === 'land') return -1;

    // Sort higher mana costs to the top
    if (a.cmc > b.cmc) return -1;
    if (a.cmc < b.cmc) return 1;

    // Finally sort alphabetically if equal mana cost or both are lands
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
  });

export const sortColors = colors => {
  const targetOrder = ['w', 'u', 'b', 'r', 'g'];
  return targetOrder.filter(color => colors.includes(color));
};

export const sortCardsByName = cards =>
  cards.sort(function(a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
  });

export const mergeCardsWithSameName = cards => {
  const reduced = cards.reduce((accum, val) => {
    const combined = { ...val };
    const accumName = accum.get(val.name);
    if (accumName) {
      combined.count += accumName.count;
    }
    return accum.set(val.name, combined);
  }, new Map());
  return [...reduced.values()];
};
