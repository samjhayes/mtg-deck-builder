<template>
  <li class="deck-card" :data-colors="card.col.join(' ')">
    <button
      class="count"
      @click.prevent="$emit('add-card-to-deck', card.id)"
      @contextmenu.prevent="$emit('remove-card-from-deck', card.id)"
    >
      x{{ card.count }}
    </button>
    <button
      class="details"
      @click.prevent="$emit('remove-card-from-deck', card.id)"
      @contextmenu.prevent="$emit('remove-card-from-deck', card.id)"
    >
      <span class="name">{{ card.name }}</span>
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
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

@mixin deck-card-color($color) {
  .details {
    background-color: lighten($color, 5%);
    border-color: darken($color, 20%);
  }
}

.deck-card {
  margin-bottom: 3px;
  display: flex;
  min-height: 40px;

  &[data-colors] {
    @include deck-card-color($multicolor);
  }

  &[data-colors=''] {
    @include deck-card-color($colorless);
  }

  @each $key, $val in $colors {
    &[data-colors='#{$key}'] {
      @include deck-card-color($val);
    }
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  .count,
  .details {
    padding: 5px 10px;
  }

  .count {
    background-color: black;
    color: white;
    min-width: 40px;
    border: 1px solid white;
    border-bottom-left-radius: 10px;
  }

  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    overflow: hidden;
    border: 4px solid $colorless;
    border-top-right-radius: 10px;
  }

  .name {
    margin-right: 10px;
    text-align: left;
  }
}
</style>
