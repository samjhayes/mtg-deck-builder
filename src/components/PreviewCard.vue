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
    top: Number,
    left: Number,
  },
  computed: {
    style() {
      const { top, left } = this;
      return {
        top: `${top}px`,
        left: `${left}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$card-width-px: 400px;

.preview-card {
  position: fixed;
  width: $card-width-px;
  height: $card-width-px * $card-aspect-ratio;
  border-radius: 25px;
  overflow: hidden;
}
</style>
