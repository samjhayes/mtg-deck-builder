<template>
  <main id="app">
    <Browse
      :data="data"
      :browse-cards="browseCards"
      :deck-cards="deckCards"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
      :set-browse-cards="setBrowseCards"
    />
    <Deck
      :data="data"
      :deckCards="deckCards"
      :mode="mode"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
      :set-mode="setMode"
    />
  </main>
</template>

<script>
import Browse from './Browse.vue';
import Deck from './Deck.vue';
import testData from '../json/testData.json';

export default {
  name: 'App',
  components: {
    Browse,
    Deck,
  },
  methods: {
    addCardToDeck: function(cardId) {
      const cardInDeck = this.deckCards.find(obj => obj.id === cardId);
      if (cardInDeck) {
        cardInDeck[`${this.mode}Count`] += 1;
      } else {
        const card = {
          id: cardId,
          mainCount: 0,
          sideboardCount: 0,
        };
        card[`${this.mode}Count`] += 1;
        this.deckCards.push(card);
      }
    },
    removeCardFromDeck: function(cardId) {
      const cardInDeck = this.deckCards.find(obj => obj.id === cardId);
      if (cardInDeck) {
        if (cardInDeck[`${this.mode}Count`] > 0) {
          cardInDeck[`${this.mode}Count`] -= 1;
        }

        if (!cardInDeck.mainCount && !cardInDeck.sideboardCount) {
          const index = this.deckCards.indexOf(cardInDeck);
          this.deckCards.splice(index, 1);
        }
      }
    },
    setBrowseCards: function(browseCards) {
      this.browseCards = browseCards;
    },
    setMode: function(mode) {
      this.mode = mode;
    },
  },
  data() {
    return {
      browseCards: [],
      deckCards: [],
      mode: 'main',
      data: testData,
    };
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

button {
  cursor: pointer;
}
</style>
