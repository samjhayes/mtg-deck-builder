<template>
  <ol class="deck-list">
    <DeckCard
      v-for="card in sortedDeck"
      :card="card"
      :key="card.id"
      @add-card-to-deck="$emit('add-card-to-deck', $event)"
      @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
    />
  </ol>
</template>

<script>
import DeckCard from './DeckCard.vue';

export default {
  name: 'DeckList',
  components: {
    DeckCard,
  },
  props: {
    deck: Array,
  },
  computed: {
    sortedDeck: function() {
      const deck = [...this.deck];
      return this.sortCardsByCMC(deck);
    },
  },
};
</script>

<style lang="scss" scoped>
.deck-list {
  margin: 10px 0;
}
</style>
