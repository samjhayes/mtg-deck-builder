<template>
  <div class="mana">
    <span class="mana-icon" v-for="(icon, index) in mana" :key="index">
      {{ icon }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    mana: Array,
  },
};
</script>

<style lang="scss" scoped>
.mana {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mana-icon {
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin: 2px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
