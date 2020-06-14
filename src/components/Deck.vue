<template>
  <aside id="deck">
    <DeckActions />
    <DeckCounter
      :main-cards="deck.mainCards"
      :sideboard-cards="deck.sideboardCards"
    />
    <DeckList
      :deck="deck.mainCards"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
    />
    <DeckList :deck="deck.sideboardCards" />
    <DeckStats />
  </aside>
</template>

<script>
import DeckActions from "./DeckActions.vue";
import DeckCounter from "./DeckCounter.vue";
import DeckList from "./DeckList.vue";
import DeckStats from "./DeckStats.vue";

export default {
  name: "Deck",
  components: {
    DeckActions,
    DeckCounter,
    DeckList,
    DeckStats
  },
  props: {
    data: Array,
    deckCards: Array,
    addCardToDeck: Function,
    removeCardFromDeck: Function
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
        sideboardCards
      };
    }
  }
};
</script>

<style lang="scss" scoped>
#deck {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  background: darkgray;
}
</style>
