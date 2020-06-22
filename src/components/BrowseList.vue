<template>
  <ol class="browse-list">
    <BrowseCard
      v-for="card in browseCards"
      :key="card.id"
      :card="card"
      :count="count(card.id)"
      @add-card-to-deck="$emit('add-card-to-deck', $event)"
      @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
    />
  </ol>
</template>

<script>
import BrowseCard from './BrowseCard.vue';

export default {
  name: 'BrowseList',
  components: {
    BrowseCard,
  },
  props: {
    browseCards: Array,
    deckCards: Array,
  },
  methods: {
    count: function(id) {
      let count = 0;
      const cardInDeck = this.getCardDataById(this.deckCards, id);
      if (cardInDeck) {
        count = cardInDeck.mainCount + cardInDeck.sideboardCount;
      }
      return count;
    },
  },
};
</script>

<style lang="scss" scoped>
$browse-card-width: 240px;

.browse-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, $browse-card-width);
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
}
</style>
