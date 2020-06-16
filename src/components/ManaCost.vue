<template>
  <div class="mana-cost">
    <Mana
      v-for="(mana, index) in manaCost"
      :mana="mana"
      :size="25"
      :key="index"
    />
  </div>
</template>

<script>
import Mana from './Mana.vue';

export default {
  name: 'ManaCost',
  components: {
    Mana,
  },
  props: {
    manaCost: Array,
  },
};
</script>

<style lang="scss" scoped>
.mana-cost {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  overflow: hidden;

  .mana {
    margin: 1px;

    &:first-of-type {
      margin-left: 0;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
