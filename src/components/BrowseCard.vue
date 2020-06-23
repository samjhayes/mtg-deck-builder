<template>
  <li class="browse-card">
    <div class="count">
      <span v-if="count">x{{ count }}</span>
    </div>
    <button
      class="button"
      @click.prevent="$emit('add-card-to-deck', card.id)"
      @contextmenu.prevent="$emit('show-preview-card', { card, event: $event })"
    >
      <Card :card="card" :load-image="loadImage" />
    </button>
  </li>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'BrowseCard',
  components: {
    Card,
  },
  props: {
    card: Object,
    count: Number,
  },
  data: function() {
    return {
      loadImage: false,
      observer: null,
    };
  },
  methods: {
    handleIntersection: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage = true;
          this.observer.disconnect();
          this.observer = null;
        }
      });
    },
  },
  mounted: function() {
    if (window['IntersectionObserver']) {
      this.observer = new IntersectionObserver(this.handleIntersection);
      this.observer.observe(this.$el);
    } else {
      this.loadImage = true;
    }
  },
  destroyed: function() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
};
</script>

<style lang="scss" scoped>
.browse-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .count {
    height: 30px;
    text-align: center;
  }

  .button {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: percentage($card-aspect-ratio);
    overflow: hidden;
    border-radius: 10px;
  }
}
</style>
