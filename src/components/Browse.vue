<template>
  <div class="browse">
    <BrowseFilters @update-filters="$emit('update-filters', $event)" />
    <span class="loading" v-if="!data.length">
      Loading
    </span>
    <ol class="browse-cards" v-else>
      <BrowseCard
        v-for="card in browse"
        :card="card"
        :key="card.id"
        @add-card-to-deck="$emit('add-card-to-deck', card.id)"
        @remove-card-from-deck="$emit('remove-card-from-deck', card.id)"
        @register-with-observer="registerWithObserver"
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
    data: Array,
    browseCards: Array,
    deckCards: Array,
  },
  data: function() {
    return {
      observer: null,
    };
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
  },
  methods: {
    registerWithObserver: function(element) {
      console.log(element);
    },
    handleIntersect: function(element) {
      console.log(element);
    },
  },
  mounted: function() {
    if (window['IntersectionObserver']) {
      const options = {
        root: null,
        threshold: '0',
      };
      this.observer = new IntersectionObserver(this.handleIntersect, options);
    }
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
  display: flex;
  flex-direction: column;
}

.browse-cards,
.loading {
  padding: 30px;
}

.browse-cards {
  display: grid;
  column-gap: 30px;
  overflow-y: auto;
  grid-template-columns: auto;

  @media screen and (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1260px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(8, 1fr);
  }

  > li {
    margin-bottom: 30px;
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>
