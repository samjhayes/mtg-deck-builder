<template>
  <div class="preview-card" :style="style">
    <Card :card="card" :load-image="true" />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'PreviewCard',
  components: {
    Card,
  },
  props: {
    card: Object,
    x: Number,
    y: Number,
    offsetX: Boolean,
    offsetY: Boolean,
  },
  computed: {
    style() {
      const { x, y, offsetX, offsetY } = this;
      const { cardWidth, cardHeight } = this.theme;
      const left = offsetX ? x - cardWidth : x;
      const top = offsetY ? y - cardHeight : y;
      return {
        left: `${left}px`,
        top: `${top}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$card-width-px: 488px;

.preview-card {
  position: fixed;
  width: $card-width-px;
  height: $card-width-px * $card-aspect-ratio;
  overflow: hidden;
  border-radius: 30px;
}
</style>
