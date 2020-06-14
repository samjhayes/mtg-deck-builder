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
.deck-actions {
  padding: 10px;
  display: flex;

  input {
    flex-grow: 1;
  }
}
</style>
