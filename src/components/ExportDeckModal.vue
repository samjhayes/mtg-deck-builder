<template>
  <Modal>
    <h2>Export deck</h2>
    <textarea
      ref="export-textarea"
      readonly
      :value="exportedDeck"
      @click.prevent="selectAllText"
    />
    <div class="buttons">
      <Button @click="copyDeckToClipboard">Copy to clipboard</Button>
      <Button @click="$emit('close-modal')">Close</Button>
    </div>
  </Modal>
</template>

<script>
import Button from './Button.vue';
import Modal from './Modal.vue';

export default {
  name: 'ExportDeckModal',
  components: {
    Button,
    Modal,
  },
  props: {
    deckCards: Array,
  },
  computed: {
    exportedDeck() {
      let mainText = '';
      let sideboardText = '';

      this.sortCardsByCMC([...this.deckCards]).forEach(card => {
        if (card.mainCount) {
          mainText += `${card.mainCount} ${card.name}\n`;
        }
        if (card.sideboardCount) {
          sideboardText += `${card.sideboardCount} ${card.name}\n`;
        }
      });

      if (sideboardText) {
        return `${mainText}\n${sideboardText}`;
      }
      return mainText;
    },
  },
  methods: {
    copyDeckToClipboard() {
      this.selectAllText();
      document.execCommand('copy');
    },
    selectAllText() {
      const target = this.$refs['export-textarea'];
      target.focus();
      target.select();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

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

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
