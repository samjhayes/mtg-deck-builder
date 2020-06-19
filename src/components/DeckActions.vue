<template>
  <div>
    <Button @click="$emit('set-modal', 'IMPORT_DECK')">Import</Button>
    <Button @click="$emit('set-modal', 'EXPORT_DECK')">Export</Button>
    <Button @click="$emit('reset-deck')">Reset</Button>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'DeckActions',
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

div {
  margin-top: 10px;
  display: flex;

  > *:last-of-type {
    margin-left: auto;
  }
}
</style>
