<template>
  <Modal>
    <div class="added">
      <h2>{{ addedCount | pluralize('card') }} added successfully</h2>
    </div>
    <div class="missing">
      <h2>{{ missingCount | pluralize('card') }} missing</h2>
      <ul v-if="importMissingCards.length">
        <li v-for="(card, index) in importMissingCards" :key="index">
          {{ card.count }}x {{ card.name }}
        </li>
      </ul>
    </div>
    <div class="buttons">
      <Button
        @click="
          $emit('reset-import-cards');
          $emit('close-modal');
        "
        >Okay</Button
      >
    </div>
  </Modal>
</template>

<script>
import Button from './Button.vue';
import Modal from './Modal.vue';

export default {
  name: 'ImportFinishedModal',
  components: {
    Button,
    Modal,
  },
  props: {
    importAddedCards: Array,
    importMissingCards: Array,
  },
  computed: {
    addedCount() {
      return this.getTotalCardCount(this.importAddedCards);
    },
    missingCount() {
      return this.getTotalCardCount(this.importMissingCards);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.added {
  color: map-get($colors, 'g');
}

.missing {
  color: map-get($colors, 'r');

  ul {
    max-height: 300px;
  }
}

h2,
ul {
  margin: 0 0 20px;
}

ul {
  overflow-y: auto;
}

li {
  margin-bottom: 5px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
