<template>
  <div class="deck">
    <DeckActions
      @set-modal="$emit('set-modal', $event)"
      @reset-deck="$emit('reset-deck', $event)"
    />
    <DeckTabs
      :main-cards="deck.mainCards"
      :sideboard-cards="deck.sideboardCards"
      :mode="mode"
      @set-mode="$emit('set-mode', $event)"
    />
    <DeckList
      :deck="activeDeck"
      @add-card-to-deck="$emit('add-card-to-deck', $event)"
      @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
    />
    <DeckStats :deck="activeDeck" />
  </div>
</template>

<script>
import DeckActions from './DeckActions.vue';
import DeckTabs from './DeckTabs.vue';
import DeckList from './DeckList.vue';
import DeckStats from './DeckStats.vue';

export default {
  name: 'Deck',
  components: {
    DeckActions,
    DeckList,
    DeckStats,
    DeckTabs,
  },
  props: {
    data: Array,
    deckCards: Array,
    mode: String,
  },
  computed: {
    deck: function() {
      const mainCards = [];
      const sideboardCards = [];
      this.deckCards.forEach(card => {
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
    },
    activeDeck: function() {
      if (this.mode === 'main') {
        return this.deck.mainCards;
      } else {
        return this.deck.sideboardCards;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.deck {
  background-color: $darkgray;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: $sidebar-width;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}
</style>
