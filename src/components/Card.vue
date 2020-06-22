<template>
  <div class="card" :title="card.name">
    <span class="name">{{ card.name }}</span>
    <span class="image" :style="style"></span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: Object,
    loadImage: Boolean,
  },
  computed: {
    style: function() {
      const style = {};
      if (this.loadImage) {
        style.backgroundImage = `url(${this.card.images[0]})`;
      }
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: $darkgray;
  border-radius: 15px;
}

.name,
.image {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
}

.image {
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
</style>
