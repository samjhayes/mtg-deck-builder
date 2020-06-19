<template>
  <div class="browse">
    <BrowseFilters @update-filters="$emit('update-filters', $event)" />
    <div class="loading" v-if="!isLoaded">
      Loading
    </div>
    <div class="overflow" v-else>
      <BrowseList
        :browse-cards="browseCards"
        :deck-cards="deckCards"
        @add-card-to-deck="$emit('add-card-to-deck', $event)"
        @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
      />
    </div>
  </div>
</template>

<script>
import BrowseFilters from './BrowseFilters.vue';
import BrowseList from './BrowseList.vue';

export default {
  name: 'Browse',
  components: {
    BrowseFilters,
    BrowseList,
  },
  props: {
    browseCards: Array,
    deckCards: Array,
    isLoaded: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.browse {
  background: $gray;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100vw - #{$sidebar-width});
  display: flex;
  flex-direction: column;
}

.loading {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.overflow {
  overflow-y: auto;
}
</style>
