<template>
  <nav class="browse-filters">
    <input v-model="search" placeholder="Search for a card" />
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
