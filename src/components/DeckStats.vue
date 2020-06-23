<template>
  <div class="deck-stats">
    <!-- <span class="cmc-graph" v-for="(count, cost) in manaCostCounts" :key="cost">
      <Mana :mana="cost" :size="25" :title="count" />
    </span> -->
  </div>
</template>

<script>
const MANA_COST_BREAKPOINT = 7;

export default {
  name: 'DeckStats',
  props: {
    deck: Array,
  },
  computed: {
    manaCostCounts: function() {
      const counts = {};
      for (let i = 0; i < MANA_COST_BREAKPOINT; i += 1) {
        counts[i] = 0;
      }
      counts[`${MANA_COST_BREAKPOINT}+`] = 0;

      const deck = [...this.deck];
      deck.forEach(card => {
        if (counts[card.cmc] < MANA_COST_BREAKPOINT) {
          counts[card.cmc] += 1;
        } else {
          counts[`${MANA_COST_BREAKPOINT}+`] += 1;
        }
      });

      return counts;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.deck-stats {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-grow: 1;
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  padding: 30px;

  .cmc-graph span {
    margin: 0 2px;
  }
}
</style>
