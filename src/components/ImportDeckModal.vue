<template>
  <Modal>
    <h2>Import deck</h2>
    <textarea v-model="importDeckText" placeholder="Paste your deck here" />
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
h2,
textarea {
  margin: 0 0 20px;
}

textarea {
  width: 100%;
  height: 500px;
  display: block;
  resize: none;
  padding: 10px;
}

div {
  display: flex;
  justify-content: flex-end;
}
</style>
