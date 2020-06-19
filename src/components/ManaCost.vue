<template>
  <div class="mana-cost">
    <template v-for="(mana, index) in processed">
      <Mana
        v-if="mana.symbol !== '/'"
        :key="index"
        :symbol="mana.symbol"
        :half="mana.half"
        shadow
        size="1x"
      />
      <span class="break" v-else :key="index">//</span>
    </template>
  </div>
</template>

<script>
import { Mana } from '@saeris/vue-mana';

export default {
  name: 'ManaCost',
  components: {
    Mana,
  },
  props: {
    manaCost: Array,
  },
  computed: {
    processed: function() {
      const processed = [];
      this.manaCost.forEach(mana => {
        const processedMana = {
          symbol: mana,
          half: false,
        };
        if (mana.slice(0, 1) === 'h') {
          processedMana.half = true;
          processedMana.symbol = mana.slice(1, 2);
        }
        processed.push(processedMana);
      });
      return processed;
    },
  },
};
</script>

<style lang="scss" scoped>
.mana-cost {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 1px;

  > * {
    margin: 1px;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }

  .break {
    margin: 0 5px;
    transform: translateY(3px);
    /* font-size: 15px; */
  }
}
</style>
