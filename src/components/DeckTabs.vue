<template>
  <div class="deck-tabs">
    <button
      class="deck-tabs-button"
      @click.prevent="setMode('main')"
      :data-active="mainActive"
    >
      Main <span class="deck-tabs-count">({{ mainCount }})</span>
    </button>
    <button
      class="deck-tabs-button"
      @click.prevent="setMode('sideboard')"
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
    setMode: Function,
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
@import '../_variables.scss';

.deck-tabs {
  margin: 0;
  display: flex;

  &-button {
    min-height: $min-input-size;
    padding: 10px;
    flex-basis: 0;
    flex-grow: 1;
    border: 1px solid white;
    background-color: black;
    color: white;

    &[data-active='true'] {
      background-color: white;
      color: black;
      font-weight: bold;
    }
  }
}
</style>
