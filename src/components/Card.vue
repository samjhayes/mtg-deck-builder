<template>
  <div
    class="card"
    :data-colors="colors"
    :style="`background-image:url(${card.img})`"
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
      if (this.card.col) {
        const colors = [...this.card.col];
        return colors.sort().join(' ');
      }
      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.card {
  border-radius: 14px;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &[data-colors] {
    background-color: $multicolor;
  }

  &[data-colors=''] {
    background-color: $colorless;
  }

  &[data-colors='W'] {
    background-color: $white;
  }

  &[data-colors='U'] {
    background-color: $blue;
  }

  &[data-colors='B'] {
    background-color: $black;
  }

  &[data-colors='R'] {
    background-color: $red;
  }

  &[data-colors='G'] {
    background-color: $green;
  }
}
</style>
