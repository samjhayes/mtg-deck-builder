<template>
  <li
    class="deck-card"
    :style="backgroundColor"
    @contextmenu.prevent="$emit('show-preview-card', { card, event: $event })"
  >
    <button class="count" @click.prevent="$emit('add-card-to-deck', card.id)">
      x<span class="num">{{ card.count }}</span>
    </button>
    <button
      class="details"
      :style="foregroundColor"
      @click.prevent="$emit('remove-card-from-deck', card.id)"
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
    foregroundColor() {
      const colors = this.theme.foregroundColors;
      let background = colors.colorless;
      if (this.card.colors.length > 1) {
        background = colors.multicolor;
      } else if (this.card.colors.length) {
        background = colors[this.card.colors[0]];
      }
      return {
        background,
      };
    },
    backgroundColor() {
      const { backgroundColors } = this.theme;
      const colors = this.sortColors(this.card.colors);
      let background = backgroundColors.colorless;
      if (colors.length > 1) {
        const gradientSections = [];
        for (let i = 0; i < colors.length; i++) {
          const color = backgroundColors[colors[i]];
          const percent = (100 / (colors.length - 1)) * i;
          gradientSections.push(`${color} ${percent}%`);
        }
        background = `linear-gradient(to right, ${gradientSections.join(
          ', '
        )})`;
      } else if (colors.length) {
        background = backgroundColors[colors[0]];
      }
      return {
        background,
      };
    },
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

.deck-card {
  position: relative;
  display: flex;
  min-height: $min-input-size;
  margin-bottom: 4px;
  border-radius: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }

  .count,
  .details {
    padding: 5px;
    position: relative;
    line-height: 1;
  }

  .count {
    background-color: black;
    color: white;
    min-width: 50px;
    border: 2px solid white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    position: relative;
    box-shadow: 2px 0 0 black;
  }

  .num {
    font-variant-numeric: tabular-nums;
  }

  .details {
    display: flex;
    align-items: center;
    padding-left: 0;
    flex-grow: 1;
    margin: 4px;
    margin-left: 6px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 2px solid black;
  }

  .type {
    font-size: 15px;
    width: 15px;
    margin: 0 7px;
    color: $darkgray;
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
