<template>
  <li class="deck-card">
    <button class="deck-card-count" @click.prevent="addCardToDeck(card.id)">
      x{{ card.count }}
    </button>
    <button
      class="deck-card-details"
      @click.prevent="removeCardFromDeck(card.id)"
    >
      <span class="deck-card-name">{{ card.name }}</span>
      <ManaCost :manaCost="card.manaCost" />
    </button>
  </li>
</template>

<script>
import ManaCost from './ManaCost.vue';

export default {
  name: 'DeckCard',
  components: {
    ManaCost,
  },
  props: {
    card: Object,
    addCardToDeck: Function,
    removeCardFromDeck: Function,
  },
};
</script>

<style lang="scss" scoped>
.deck-card {
  margin: 0 0 5px;
  padding: 0;
  list-style: none;
  display: flex;

  &:last-of-type {
    margin-bottom: 0;
  }

  &-count,
  &-details {
    padding: 5px 10px;
    border: 1px solid black;
  }

  &-count {
    background: black;
    color: white;
    min-width: 50px;
  }

  &-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
}
</style>
