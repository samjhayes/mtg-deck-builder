<template>
  <div :class="'card ' + card.colors.join(' ')">
    <span class="card-name">{{ card.name }}</span>
    <ManaCost :manaCost="card.manaCost" />
    <span class="card-type" v-if="card.type">{{ card.type }}</span>
    <span class="card-subtypes" v-if="card.subtypes.length">
      {{ card.subtypes.join(' ') }}
    </span>
    <span class="card-set" v-if="card.set">{{ card.set }}</span>
    <span class="card-text" v-if="card.text">{{ card.text }}</span>
  </div>
</template>

<script>
import ManaCost from './ManaCost.vue';

export default {
  name: 'Card',
  components: {
    ManaCost,
  },
  props: {
    card: Object,
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 63px * 4;
  height: 88px * 4;
  background: darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > * {
    margin: 5px;
  }
}
</style>
