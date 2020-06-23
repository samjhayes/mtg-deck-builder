<template>
  <div class="mana-cost" v-if="processedManaCost.length">
    <Mana
      v-for="(mana, index) in processedManaCost"
      :key="index"
      :symbol="mana.symbol"
      :half="mana.half"
      shadow
      size="1x"
    />
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
    processedManaCost() {
      const manaCost = [];
      if (this.manaCost) {
        this.manaCost.forEach(mana => {
          const processedMana = {
            symbol: mana,
            half: false,
          };
          if (mana.slice(0, 1) === 'h') {
            processedMana.half = true;
            processedMana.symbol = mana.slice(1, 2);
          }
          manaCost.push(processedMana);
        });
      }
      return manaCost;
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
