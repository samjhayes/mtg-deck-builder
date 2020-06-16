<template>
  <div
    :class="`card ${colors}`"
    :style="`background-image:url(${card.image})`"
  ></div>
</template>

<script>
export default {
  name: 'Card',
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
  },
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 14px;
  background-color: darkgray;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
