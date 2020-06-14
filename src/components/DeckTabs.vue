<template>
  <div class="deck-tabs">
    <button
      class="deck-tabs-button"
      @click.prevent="changeMode('main')"
      :data-active="mainActive"
    >
      Main <span class="deck-tabs-count">({{ mainCount }})</span>
    </button>
    <button
      class="deck-tabs-button"
      @click.prevent="changeMode('sideboard')"
      :data-active="sideboardActive"
    >
      Sideboard <span class="deck-tabs-count">({{ sideboardCount }})</span>
    </button>
  </div>
</template>

<script>
const getTotalCount = cards => {
  let count = 0;
  cards.forEach(obj => (count += obj.count));
  return count;
};

export default {
  name: 'DeckTabs',
  props: {
    mainCards: Array,
    sideboardCards: Array,
    changeMode: Function,
    mode: String,
  },
  computed: {
    mainCount: function() {
      return getTotalCount(this.mainCards);
    },
    sideboardCount: function() {
      return getTotalCount(this.sideboardCards);
    },
    mainActive: function() {
      return this.mode === 'main';
    },
    sideboardActive: function() {
      return this.mode === 'sideboard';
    },
  },
};
</script>

<style lang="scss" scoped>
.deck-tabs {
  padding: 10px;
  display: flex;

  &-button {
    padding: 10px;
    flex-basis: 0;
    flex-grow: 1;
    border: 1px solid white;

    &[data-active='true'] {
      background: black;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
