<template>
  <main id="app">
    <Browse
      :data="data"
      :browse-cards="browseCards"
      :deck-cards="deckCards"
      :add-card-to-deck="addCardToDeck"
      :remove-card-from-deck="removeCardFromDeck"
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
    setBrowseCards: function(browseCards) {
      this.browseCards = browseCards;
    },
    setMode: function(mode) {
      this.mode = mode;
    },
  },
  data() {
    return {
      browseCards: ['86bf43b1-8d4e-4759-bb2d-0b2e03ba7012', '7002a87b-a55f-42ec-b247-119a3229129f', '57ebd34e-dfe1-4093-a302-db395047a546'],
      deckCards: [],
      mode: 'main',
      data: [],
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
