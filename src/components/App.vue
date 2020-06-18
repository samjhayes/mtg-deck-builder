<template>
  <main id="app">
    <Browse
      :data="data"
      :browse-cards="browseCards"
      :deck-cards="deckCards"
      @add-card-to-deck="addCardToDeck"
      @remove-card-from-deck="removeCardFromDeck"
      @update-filters="updateFilters"
    />
    <Deck
      :data="data"
      :deckCards="deckCards"
      :mode="mode"
      @add-card-to-deck="addCardToDeck"
      @remove-card-from-deck="removeCardFromDeck"
      @set-mode="setMode"
    />
  </main>
</template>

<script>
import Browse from './Browse.vue';
import Deck from './Deck.vue';

const MAX_BROWSE_CARDS = 32;

export default {
  name: 'App',
  components: {
    Browse,
    Deck,
  },
  mounted: async function() {
    const data = await import(/* webpackChunkName: "OracleCardData" */ '../assets/oracle.min.json');
    this.data = this.sortCardsByName(data.default);
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
    updateFilters: function(filters) {
      const { search, color } = filters;
      if (search) {
        let results = this.data.filter(card => {
          return card.name.toLowerCase().startsWith(search.toLowerCase());
        });

        results = results.sort();

        let activeColors = color.filter(color => color.active)
        activeColors = activeColors.map(color => color.symbol);
        if (activeColors.length) {
          results = results.filter(card => {
            const cardColors = card.col.length ? card.col : ['c'];
            let matchingColorsCount = 0;
            for (let i = 0; i < cardColors.length; i +=1) {
              const color = cardColors[i];
              if (activeColors.includes(color)) {
                matchingColorsCount += 1;
              }
            }
            return matchingColorsCount === cardColors.length;
          });
        }

        results = results.slice(0, MAX_BROWSE_CARDS);
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
@import '../_variables.scss';

$ms-font-path: '~mana-font/fonts';
@import 'mana-font/sass/mana';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

input {
  min-height: $min-input-size;
  padding: 5px 10px;
  border: none;
}

button {
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>
