<template>
  <div
    class="card"
    :title="card.name"
    :data-colors="card.col.join(' ')"
    :style="`background-image:url(${card.img})`"
  ></div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,
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

  @each $key, $val in $colors {
    &[data-colors='#{$key}'] {
      background-color: $val;
    }
  }
}
</style>
