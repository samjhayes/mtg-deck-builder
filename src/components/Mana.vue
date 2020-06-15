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
$mana_size: 25px;

.mana {
  background: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: $mana_size;
  height: $mana_size;
  font-size: 11px;
}
</style>
