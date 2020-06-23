<template>
  <div class="deck-tabs">
    <button
      :data-active="mainActive"
      @click.prevent="$emit('set-mode', 'main')"
    >
      Main (<span class="num">{{ mainCount }}</span
      >)
    </button>
    <button
      :data-active="sideboardActive"
      @click.prevent="$emit('set-mode', 'sideboard')"
    >
      Sideboard (<span class="num">{{ sideboardCount }}</span
      >)
    </button>
  </div>
</template>

<script>
export default {
  name: 'DeckTabs',
  props: {
    mainCards: Array,
    sideboardCards: Array,
    setMode: Function,
    mode: String,
  },
  computed: {
    mainCount() {
      return this.getTotalCardCount(this.mainCards);
    },
    sideboardCount() {
      return this.getTotalCardCount(this.sideboardCards);
    },
    mainActive() {
      return this.mode === 'main';
    },
    sideboardActive() {
      return this.mode === 'sideboard';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.deck-tabs {
  margin: 10px 0;
  display: flex;

  button {
    min-height: $min-input-size;
    padding: 10px;
    flex-basis: 0;
    flex-grow: 1;
    border: 2px solid white;
    background-color: black;
    color: white;

    &[data-active='true'] {
      background-color: white;
      color: black;
      font-weight: bold;
    }

    &:first-of-type {
      border-top-left-radius: 10px;
    }

    &:last-of-type {
      border-top-right-radius: 10px;
    }
  }

  .num {
    font-variant-numeric: tabular-nums;
  }
}
</style>
