<template>
  <li class="browse-card">
    <div class="browse-card-count">x{{ count }}</div>
    <button
      class="browse-card-button"
      @click.prevent="addCardToDeck(card.id)"
      @contextmenu.prevent="removeCardFromDeck(card.id)"
    >
      <Card :card="card" />
    </button>
  </li>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'BrowseCard',
  components: {
    Card,
  },
  props: {
    card: Object,
    addCardToDeck: Function,
    removeCardFromDeck: Function,
  },
  computed: {
    count: function() {
      return parseInt(this.card.mainCount) + parseInt(this.card.sideboardCount);
    },
  },
};
</script>

<style lang="scss" scoped>
$card-width: 64;
$card-height: 88;

$aspect-ratio: $card-height / $card-width;

.browse-card {
  text-align: center;

  &-count {
    margin-bottom: 10px;
  }

  &-button {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: percentage($aspect_ratio);
  }
}
</style>
