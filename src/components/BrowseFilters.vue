<template>
  <nav class="browse-filters">
    <input placeholder="Search for a card" />
    <div class="browse-filters-mana-color">
      <button v-for="(manaColor, index) in manaColorFilters" :key="index">
        <Mana :mana="manaColor" />
      </button>
      <button>
        <Mana mana="A" data-active="true" />
      </button>
    </div>
  </nav>
</template>

<script>
import Mana from './Mana.vue';

export default {
  name: 'BrowseFilters',
  components: {
    Mana,
  },
  computed: {
    manaColorFilters: () => ['W', 'U', 'B', 'R', 'G', 'X'],
  },
};
</script>

<style lang="scss" scoped>
.browse-filters {
  background: gray;
  padding: 10px 30px;
  display: flex;

  input {
    margin-right: 10px;
    width: 300px;
    padding: 5px 10px;
  }

  button {
    padding: 0;
    background: transparent;
    border: none;
    margin-left: 5px;

    .mana[data-active='true'] {
      background: white;
      color: black;
      font-weight: bold;
    }
  }

  &-mana-color {
    display: flex;
  }
}
</style>
