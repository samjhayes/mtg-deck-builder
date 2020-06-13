<template>
  <li class="browse-card">
    <div class="browse-card-details">
      <span class="browse-card-name">{{ card.name }}</span>
      <span class="browse-card-count">x{{ count }}</span>
    </div>
    <div class="browse-card-image"></div>
  </li>
</template>

<script>
export default {
  name: "BrowseCard",
  props: {
    card: Object
  },
  computed: {
    count: function() {
      return parseInt(this.card.mainCount) + parseInt(this.card.sideboardCount);
    }
  }
};
</script>

<style lang="scss" scoped>
.browse-card {
  list-style: none;
  text-align: center;
  margin: 10px;
}
.browse-card-image {
  width: 63px * 4;
  height: 88px * 4;
  background: gray;
  margin: 10px auto 0;
}
</style>
