<template>
  <nav id="browse-filters">
    <input placeholder="Search for a card" />
    <button>R</button>
    <button>B</button>
    <button>U</button>
    <button>G</button>
    <button>W</button>
    <button>–</button>
  </nav>
</template>

<script>
export default {
  name: "BrowseFilters"
};
</script>

<style lang="scss" scoped>
#browse-filters {
  background: gray;
  padding: 10px;
}
</style>
