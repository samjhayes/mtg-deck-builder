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
      const { previewCardWidth, previewCardHeight } = this.theme;
      const left = offsetX ? x - previewCardWidth : x;
      const top = offsetY ? y - previewCardHeight : y;
      return {
        left: `${left}px`,
        top: `${top}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.preview-card {
  position: fixed;
  width: $preview-card-width * 1px;
  height: $preview-card-height * 1px;
  overflow: hidden;
  border-radius: 20px;
}
</style>
