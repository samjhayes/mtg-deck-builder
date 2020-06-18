<template>
  <ol class="browse-list">
    <BrowseCard
      v-for="card in browseCards"
      :key="card.id"
      :card="card"
      @add-card-to-deck="$emit('add-card-to-deck', $event)"
      @remove-card-from-deck="$emit('remove-card-from-deck', $event)"
    />
  </ol>
</template>

<script>
import BrowseCard from './BrowseCard.vue';

export default {
  name: 'BrowseList',
  components: {
    BrowseCard,
  },
  props: {
    browseCards: Array,
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.browse-list {
  flex-grow: 1;
  display: grid;
  column-gap: 30px;
  overflow-y: auto;
  grid-template-columns: auto;
  padding: 30px;

  @media screen and (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1260px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 1920px) {
    grid-template-columns: repeat(8, 1fr);
  }

  > li {
    margin-bottom: 30px;
  }
}
</style>
