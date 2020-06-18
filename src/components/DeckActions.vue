<template>
  <div class="deck-actions">
    <input placeholder="Untitled Deck 1" />
    <button>Import</button>
    <button>Export</button>
  </div>
</template>

<script>
export default {
  name: 'DeckActions',
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.deck-actions {
  margin: 10px 0;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;

  input {
    flex-grow: 1;
  }

  button {
    min-height: $min-input-size;
    background-color: lightgray;
    padding: 10px;
  }
}
</style>
