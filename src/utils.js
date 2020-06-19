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

export const sortCardsByName = cards =>
  cards.sort(function(a, b) {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
  });

export const sortCardsByCMC = cards =>
  cards.sort(function(a, b) {
    if (a.cmc > b.cmc) return -1;
    if (a.cmc < b.cmc) return 1;

    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
  });

export const getTypeFromTypeLine = typeLine => {
  const lower = typeLine.toLowerCase();
  if (lower.includes('land')) {
    return 'land';
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
  return 'multiple';
};
