<template>
  <li class="deck-card" :data-colors="card.col.join(' ')">
    <button class="deck-card-count" @click.prevent="addCardToDeck(card.id)">
      x{{ card.count }}
    </button>
    <button
      class="deck-card-details"
      @click.prevent="removeCardFromDeck(card.id)"
    >
      <span class="deck-card-name">{{ card.name }}</span>
      <ManaCost :manaCost="card.mc" />
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
@import '../_variables.scss';

.deck-card {
  margin-bottom: 2px;
  display: flex;
  min-height: 40px;

  &[data-colors] {
    background-color: $multicolor;
  }

  &[data-colors=''] {
    background-color: $colorless;
  }

  @each $key, $val in $colors {
    &[data-colors='#{$key}'] {
      background-color: $val;
    }
  }

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
    min-width: 40px;
  }

  &-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    overflow: hidden;
  }

  &-name {
    margin-right: 10px;
  }
}
</style>
