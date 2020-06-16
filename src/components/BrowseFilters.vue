<template>
  <nav class="browse-filters">
    <input v-model="search" placeholder="Search for a card" />
    <div class="browse-filters-mana-color">
      <button v-for="(manaColor, index) in manaColorFilters" :key="index">
        <Mana :mana="manaColor" :size="35" />
      </button>
      <button>
        <Mana mana="A" :size="35" data-active="true" />
      </button>
    </div>
  </nav>
</template>

<script>
import Mana from './Mana.vue';

const SEARCH_DEBOUNCE_MS = 250;

export default {
  name: 'BrowseFilters',
  components: {
    Mana,
  },
  data: function() {
    return {
      debouncedSearch: '',
      timeout: null,
    };
  },
  computed: {
    manaColorFilters: () => ['W', 'U', 'B', 'R', 'G', 'X'],
    search: {
      get() {
        return this.debouncedSearch;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.debouncedSearch = val;
          this.$emit('search-changed', this.debouncedSearch);
        }, SEARCH_DEBOUNCE_MS);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.browse-filters {
  background: black;
  padding: 10px;
  display: flex;

  input {
    margin-right: 10px;
    width: 400px;
  }

  button {
    padding: 0;
    background: transparent;
    border: none;
    margin-left: 5px;

    .mana[data-active='true'] {
      font-weight: bold;
      color: white;
      border: 2px solid white;
    }
  }

  &-mana-color {
    display: flex;
  }
}
</style>
