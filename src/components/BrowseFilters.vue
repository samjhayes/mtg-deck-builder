<template>
  <nav class="browse-filters">
    <input
      class="search-filter"
      v-model="searchFilter"
      placeholder="Search for a card"
    />
    <div class="color-filter">
      <button
        v-for="(filter, index) in filters.color"
        :key="index"
        :data-active="filter.active"
        @click="colorFilter(filter)"
      >
        <Mana :symbol="filter.symbol" shadow size="2x" />
      </button>
    </div>
  </nav>
</template>

<script>
import { Mana } from '@saeris/vue-mana';

const SEARCH_DEBOUNCE_MS = 250;

export default {
  name: 'BrowseFilters',
  components: {
    Mana,
  },
  data: function() {
    return {
      filters: {
        search: '',
        color: [
          { symbol: 'w', active: false },
          { symbol: 'u', active: false },
          { symbol: 'b', active: false },
          { symbol: 'r', active: false },
          { symbol: 'g', active: false },
          { symbol: 'c', active: false },
        ],
      },
      searchTimeout: null,
    };
  },
  computed: {
    searchFilter: {
      get() {
        return this.filters.search;
      },
      set(val) {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.filters.search = val;
          this.$emit('filter-changed', this.filters);
        }, SEARCH_DEBOUNCE_MS);
      },
    },
  },
  methods: {
    colorFilter: function(filter) {
      filter.active = !filter.active;
      this.$emit('filter-changed', this.filters);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.browse-filters {
  background-color: $darkgray;
  padding: 10px;
  display: flex;

  input {
    margin-right: 30px;
    width: 400px;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: none;
    margin-left: 3px;
    border-radius: 50%;
    width: $min-input-size;
    height: $min-input-size;
    border: 4px solid lighten($darkgray, 15%);

    &[data-active='true'] {
      border-color: white;
    }
  }

  .color-filter {
    display: flex;
  }
}
</style>
