<template>
  <li class="deck-card">
    <button class="deck-card-count" @click.prevent="addCardToDeck(card.id)">
      x{{ card.count }}
    </button>
    <button
      class="deck-card-details"
      @click.prevent="removeCardFromDeck(card.id)"
    >
      <span class="deck-card-name">{{ card.name }}</span>
      <Mana :mana="card.mana" />
    </button>
  </li>
</template>

<script>
import Mana from "./Mana.vue";

export default {
  name: "DeckCard",
  components: {
    Mana
  },
  props: {
    card: Object,
    addCardToDeck: Function,
    removeCardFromDeck: Function
  }
};
</script>

<style lang="scss" scoped>
.deck-card {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;

  &-count,
  &-details {
    padding: 5px 10px;
  }

  &-count {
    background: black;
    color: white;
    min-width: 50px;
  }

  &-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
  }
}
</style>
