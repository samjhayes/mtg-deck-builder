<template>
  <div class="card" :title="card.name" :style="style"></div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,
    showImage: Boolean,
  },
  computed: {
    style: function() {
      const style = {};
      if (this.showImage) {
        style.backgroundImage = `url(${this.card.img})`;
      }
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.card {
  border-radius: 18px;
  background-size: contain;
  background-position: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $colorless;
}
</style>
