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
      :change-mode="changeMode"
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
    changeMode: function(mode) {
      this.mode = mode;
    },
  },
  data() {
    return {
      browseCards: [5, 2, 3, 1, 4],
      deckCards: [],
      mode: 'main',
      data: [
        {
          id: 1,
          name: 'test1',
          colors: ['R', 'G'],
          mana: ['R', 'G', 2],
          cmc: 4,
          type: 'sorcery',
          subtypes: [],
          set: '',
          text: 'this is a card',
        },
        {
          id: 2,
          name: 'test2',
          colors: ['U', 'B'],
          mana: ['U', 'B'],
          cmc: 2,
          type: 'sorcery',
          subtypes: [],
          set: '',
          text: 'this is a card',
        },
        {
          id: 3,
          name: 'test3',
          colors: ['W'],
          mana: ['W', 'W', 3],
          cmc: 5,
          type: 'sorcery',
          subtypes: [],
          set: '',
          text: 'this is a card',
        },
        {
          id: 4,
          name: 'test4',
          colors: ['W'],
          mana: ['W', 'W', 3],
          cmc: 5,
          type: 'sorcery',
          subtypes: [],
          set: '',
          text: 'this is a card',
        },
        {
          id: 5,
          name: 'test5',
          colors: ['U', 'B'],
          mana: ['U', 'B'],
          cmc: 2,
          type: 'sorcery',
          subtypes: [],
          set: '',
          text: 'this is a card',
        },
      ],
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
