<template>
  <ol class="deck-list">
    <DeckCard
      v-for="card in deck"
      :card="card"
      :key="card.id"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
    />
  </ol>
</template>

<script>
import DeckCard from "./DeckCard.vue";

export default {
  name: "DeckList",
  components: {
    DeckCard
  },
  props: {
    deck: Array,
    addCardToDeck: Function,
    removeCardFromDeck: Function
  }
};
</script>

<style lang="scss" scoped>
.deck-list {
  padding: 10px;
  margin: 0;
}
</style>
