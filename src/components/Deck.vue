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
      @show-preview-card="$emit('show-preview-card', $event)"
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
    deck() {
      return this.getSeparateMainAndSideboard(this.deckCards);
    },
    activeDeck() {
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
@import '../_variables.scss';

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
