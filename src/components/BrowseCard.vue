<template>
  <li class="browse-card">
    <div class="browse-card-count">x{{ count }}</div>
    <button
      class="browse-card-button"
      @click.prevent="$emit('add-card-to-deck', card.id)"
      @contextmenu.prevent="$emit('remove-card-from-deck', card.id)"
    >
      <Card :card="card" :show-image="showImage" />
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
  },
  data: function() {
    return {
      showImage: false,
      observer: null,
    };
  },
  computed: {
    count: function() {
      return parseInt(this.card.mainCount) + parseInt(this.card.sideboardCount);
    },
  },
  methods: {
    handleIntersection: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.showImage = true;
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
      this.showImage = true;
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
$card-width: 64;
$card-height: 88;

$aspect-ratio: $card-height / $card-width;

.browse-card {
  text-align: center;

  &-count {
    margin-bottom: 10px;
  }

  &-button {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: percentage($aspect_ratio);
  }
}
</style>
