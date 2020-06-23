<template>
  <ol class="deck-list">
    <DeckCard
      v-for="card in sortedDeck"
      :card="card"
      :key="card.id"
      @add-card-to-deck="$emit('add-card-to-deck', $event)"
      @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
      @show-preview-card="$emit('show-preview-card', $event)"
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
@import '../_variables.scss';

.deck-list {
  overflow-y: auto;
}
</style>
