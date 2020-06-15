<template>
  <span class="mana">
    {{ mana }}
  </span>
</template>

<script>
export default {
  name: 'Mana',
  props: {
    mana: String,
  },
};
</script>

<style lang="scss" scoped>
.mana {
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
}
</style>
