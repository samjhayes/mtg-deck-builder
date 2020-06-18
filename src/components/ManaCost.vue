<template>
  <div class="mana-cost">
    <Mana
      v-for="(mana, index) in manaCost"
      :key="index"
      :symbol="mana"
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
}
</style>
