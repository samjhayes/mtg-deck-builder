<template>
  <div class="mana-cost">
    <template v-for="(mana, index) in processedManaCost">
      <Mana
        :key="index"
        :symbol="mana.symbol"
        :half="mana.half"
        shadow
        size="1x"
      />
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
    processedManaCost: function() {
      const processedManaCost = [];
      if (this.manaCost.length) {
        this.manaCost[0].forEach(mana => {
          const processedMana = {
            symbol: mana,
            half: false,
          };
          if (mana.slice(0, 1) === 'h') {
            processedMana.half = true;
            processedMana.symbol = mana.slice(1, 2);
          }
          processedManaCost.push(processedMana);
        });
      }
      return processedManaCost;
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
