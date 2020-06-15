<template>
  <div class="browse">
    <BrowseFilters />
    <span class="loading" v-if="!data.length">
      Loading
    </span>
    <ol class="browse-cards" v-else>
      <BrowseCard
        v-for="card in sortedBrowse"
        :card="card"
        :key="card.id"
        :add-card-to-deck="addCardToDeck"
        :remove-card-from-deck="removeCardFromDeck"
      />
    </ol>
  </div>
</template>

<script>
import BrowseCard from './BrowseCard.vue';
import BrowseFilters from './BrowseFilters.vue';

export default {
  name: 'Browse',
  components: {
    BrowseCard,
    BrowseFilters,
  },
  props: {
    browseCards: Array,
    data: Array,
    deckCards: Array,
    addCardToDeck: Function,
    removeCardFromDeck: Function,
  },
  computed: {
    browse: function() {
      const cards = [];
      this.browseCards.forEach(cardId => {
        const cardData = this.getCardDataById(this.data, cardId);
        if (cardData) {
          const card = { ...cardData, mainCount: 0, sideboardCount: 0 };
          const cardInDeck = this.deckCards.find(obj => obj.id === cardId);
          if (cardInDeck) {
            if (cardInDeck.mainCount) {
              card.mainCount = cardInDeck.mainCount;
            }
            if (cardInDeck.sideboardCount) {
              card.sideboardCount = cardInDeck.sideboardCount;
            }
          }
          cards.push(card);
        }
      });
      return cards;
    },
    sortedBrowse: function() {
      const browse = [...this.browse];
      return this.sortCardsByName(browse);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.browse {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100vw - #{$sidebar-width});
}

.browse-cards,
.loading {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin: 0;
}

.loading {
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
