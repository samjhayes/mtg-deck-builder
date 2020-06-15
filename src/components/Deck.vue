<template>
  <div class="deck">
    <DeckActions />
    <DeckTabs
      :main-cards="deck.mainCards"
      :sideboard-cards="deck.sideboardCards"
      :mode="mode"
      :set-mode="setMode"
    />
    <DeckList
      :deck="activeDeck"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
    />
    <DeckStats />
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
    addCardToDeck: Function,
    removeCardFromDeck: Function,
    setMode: Function,
  },
  computed: {
    deck: function() {
      const mainCards = [];
      const sideboardCards = [];
      this.deckCards.forEach(obj => {
        const cardData = this.getCardDataById(this.data, obj.id);
        if (cardData) {
          if (obj.mainCount) {
            mainCards.push({ ...cardData, count: obj.mainCount });
          }
          if (obj.sideboardCount) {
            sideboardCards.push({ ...cardData, count: obj.sideboardCount });
          }
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
@import '../_variables.scss';

.deck {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: $sidebar-width;
  background: gray;
}
</style>
