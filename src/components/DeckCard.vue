<template>
  <li class="deck-card" :data-colors="card.colors.join(' ')">
    <button
      class="count"
      @click.prevent="$emit('add-card-to-deck', card.id)"
      @contextmenu.prevent="$emit('remove-card-from-deck', card.id)"
    >
      x<span class="num">{{ card.count }}</span>
    </button>
    <button
      class="details"
      @click.prevent="$emit('remove-card-from-deck', card.id)"
      @contextmenu.prevent="$emit('remove-card-from-deck', card.id)"
    >
      <span class="type">
        <Mana v-if="type" :symbol="type" fixed />
      </span>
      <span class="name">{{ card.name }}</span>
      <ManaCost
        v-if="card.manaCosts.length"
        class="mana-cost"
        :manaCost="card.manaCosts[0]"
      />
    </button>
  </li>
</template>

<script>
import { Mana } from '@saeris/vue-mana';
import ManaCost from './ManaCost.vue';

export default {
  name: 'DeckCard',
  components: {
    Mana,
    ManaCost,
  },
  props: {
    card: Object,
  },
  computed: {
    type() {
      if (this.card.types.length) {
        if (['token', 'unknown'].includes(this.card.types[0])) {
          return 'multiple';
        }
        return this.card.types[0];
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

@mixin deck-card-color($color) {
  .details {
    background-color: lighten($color, 5%);
    border-color: darken($color, 20%);

    .type {
      color: darken($color, 35%);
    }
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
    min-width: 50px;
    border: 2px solid white;
    border-bottom-left-radius: 10px;
  }

  .num {
    font-variant-numeric: tabular-nums;
  }

  .details {
    display: flex;
    align-items: center;
    border: 4px solid $colorless;
    border-top-right-radius: 10px;
    padding-left: 0;
    flex-grow: 1;
  }

  .type {
    width: 15px;
    margin: 0 10px;
    font-size: 15px;
  }

  .name {
    margin-right: 20px;
    text-align: left;
  }

  .mana-cost {
    flex-grow: 1;
    min-width: max-content;
  }
}
</style>
