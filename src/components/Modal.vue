<template>
  <div class="modal-wrapper">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.modal-wrapper {
  background-color: $modal-background;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 20px;
  max-width: 95vw;
  max-height: 95vh;
}
</style>
