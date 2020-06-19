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
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.5);
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
  padding: 30px;
  max-width: 90vw;
  max-height: 90vh;
}
</style>
