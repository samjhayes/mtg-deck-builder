<template>
  <div :class="`card ${colors}`" :style="`background-image:url(${card.image})`">
    <!-- <span class="card-name">{{ card.name }}</span>
    <ManaCost v-if="manaCost" :manaCost="manaCost" />
    <span class="card-type" v-if="card.type_line">{{ card.type_line }}</span>
    <span class="card-subtypes" v-if="subtypes">
      {{ subtypes }}
    </span>
    <span class="card-text" v-if="card.text">
      {{ card.text }}
    </span> -->
  </div>
</template>

<script>
// import ManaCost from './ManaCost.vue';

export default {
  name: 'Card',
  // components: {
  //   ManaCost,
  // },
  props: {
    card: Object,
  },
  computed: {
    colors: function() {
      if (this.card.colors) {
        const colors = [...this.card.colors];
        return colors.sort().join(' ');
      }
      return '';
    },
    subtypes: function() {
      if (this.card.subtypes) {
        return this.card.subtypes.join(' ');
      }
      return '';
    },
    manaCost: function() {
      return this.processManaCost(this.card.mana_cost);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 63px * 4;
  height: 88px * 4;
  border-radius: 14px;
  background-color: darkgray;
  background-size: contain;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > * {
    margin: 5px;
  }
}
</style>
