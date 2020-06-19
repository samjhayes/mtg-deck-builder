<template>
  <Modal>
    <p>Import a deck</p>
    <textarea v-model="importDeckText" />
    <div>
      <Button
        @click="
          $emit('reset-deck');
          $emit('import-deck', importDeckText);
        "
        >Import (overwrite)</Button
      >
      <Button @click="$emit('import-deck', importDeckText)"
        >Import (append)</Button
      >
      <Button @click="$emit('close-modal')">Cancel</Button>
    </div>
  </Modal>
</template>

<script>
import Button from './Button.vue';
import Modal from './Modal.vue';

export default {
  name: 'ImportDeckModal',
  components: {
    Button,
    Modal,
  },
  data: function() {
    return {
      importDeckText: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

p,
textarea {
  margin: 0 0 20px;
}

textarea {
  display: block;
  width: 600px;
  height: 600px;
  max-width: 100%;
  resize: none;
}

div {
  display: flex;
  justify-content: flex-end;
}
</style>
