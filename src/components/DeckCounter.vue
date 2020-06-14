<template>
  <div class="deck-counter">
    <button
      class="deck-counter-button"
      @click.prevent="changeMode('main')"
      :data-active="mainActive"
    >
      Main <span class="deck-counter-count">({{ mainCount }})</span>
    </button>
    <button
      class="deck-counter-button"
      @click.prevent="changeMode('sideboard')"
      :data-active="sideboardActive"
    >
      Sideboard <span class="deck-counter-count">({{ sideboardCount }})</span>
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
  name: "DeckCounter",
  props: {
    mainCards: Array,
    sideboardCards: Array,
    changeMode: Function,
    mode: String
  },
  computed: {
    mainCount: function() {
      return getTotalCount(this.mainCards);
    },
    sideboardCount: function() {
      return getTotalCount(this.sideboardCards);
    },
    mainActive: function() {
      return this.mode === "main";
    },
    sideboardActive: function() {
      return this.mode === "sideboard";
    }
  }
};
</script>

<style lang="scss" scoped>
.deck-counter {
  padding: 10px;
  display: flex;

  &-button {
    padding: 10px;
    flex-basis: 0;
    flex-grow: 1;

    &[data-active="true"] {
      background: black;
      color: white;
      font-weight: bold;
    }
  }
}
</style>
