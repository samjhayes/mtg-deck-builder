<template>
  <button @click.prevent="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

button {
  min-height: $min-input-size;
  min-width: 80px;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  background-color: $gray;
  border: 2px solid black;

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
