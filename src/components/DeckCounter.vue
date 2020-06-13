<template>
  <div id="deck-counter">
    <span>Main ({{ mainCount }})</span>
    <span>Sideboard ({{ sideboardCount }})</span>
  </div>
</template>

<script>
const getTotalCount = cards => {
  let count = 0;
  cards.forEach(obj => (count += obj.count));
  return count;
};

export default {
  name: "DeckCounter",
  props: {
    mainCards: Array,
    sideboardCards: Array
  },
  computed: {
    mainCount: function() {
      return getTotalCount(this.mainCards);
    },
    sideboardCount: function() {
      return getTotalCount(this.sideboardCards);
    }
  }
};
</script>

<style lang="scss" scoped>
#deck-counter {
  padding: 10px;
}
</style>
