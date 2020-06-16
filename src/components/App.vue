<template>
  <main id="app">
    <Browse
      :data="data"
      :browse-cards="browseCards"
      :deck-cards="deckCards"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
      @update-filters="updateFilters"
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

export default {
  name: 'App',
  components: {
    Browse,
    Deck,
  },
  mounted: async function() {
    const data = await import(/* webpackChunkName: "OracleCardData" */ '../assets/oracle.min.json');
    this.data = data.default;
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
    setMode: function(mode) {
      this.mode = mode;
    },
    updateFilters: function(search) {
      if (search) {
        let results = this.data.filter(card => {
          return card.name.toLowerCase().startsWith(search);
        });
        results = results.slice(0, 100);
        this.browseCards = results.map(card => card.id);
      } else {
        this.browseCards = [];
      }
    },
  },
  data() {
    return {
      data: [],
      browseCards: [],
      deckCards: [],
      mode: 'main',
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
