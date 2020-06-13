<template>
  <li class="deck-card">
    <span class="deck-card-count">{{ card.count }}x</span>
    <span class="deck-card-name">{{ card.name }}</span>
    <span class="deck-card-mana">{{ card.mana }}</span>
  </li>
</template>

<script>
export default {
  name: "DeckCard",
  props: {
    card: Object
  }
};
</script>

<style lang="scss" scoped>
.deck-card {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
