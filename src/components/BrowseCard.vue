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
.browse-card {
  list-style: none;
  text-align: center;
  margin: 10px;

  &-count {
    margin-bottom: 10px;
  }

  &-button {
    padding: 0;
    border: none;
  }
}
</style>
