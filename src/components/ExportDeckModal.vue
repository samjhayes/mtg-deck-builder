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
      <Button @click="downloadTabletopSimulatorDeck">Download TTS deck</Button>
      <Button @click="$emit('close-modal')">Close</Button>
    </div>
  </Modal>
</template>

<script>
import Button from './Button.vue';
import Modal from './Modal.vue';

const CARD_BACK_URI =
  'https://img.scryfall.com/card_backs/image/large/59/597b79b3-7d77-4261-871a-60dd17403388.jpg?1548988262';

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
    formatDeckForTabletopSimulator(cards, offsetX) {
      const containedObjects = [];
      const customDeck = {};

      cards.forEach((card, i) => {
        // Image reference - only need one per type of card
        customDeck[i + 1] = {
          FaceURL: card.images[0],
          BackURL: CARD_BACK_URI,
          NumHeight: 1,
          NumWidth: 1,
          BackIsHidden: true,
        };

        // Tabletop Simulator deck cards - need one object per card
        for (let j = 0; j < card.count; j++) {
          containedObjects.push({
            CardID: (i + 1) * 100,
            Name: 'Card',
            Nickname: card.name,
            Transform: {
              posX: 0,
              posY: 0,
              posZ: 0,
              rotX: 0,
              rotY: 180,
              rotZ: 180,
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          });
        }
      });

      return {
        Name: 'DeckCustom',
        ContainedObjects: containedObjects,
        DeckIDs: containedObjects.map(card => card.CardID),
        CustomDeck: customDeck,
        Transform: {
          posX: offsetX,
          posY: 1,
          posZ: 0,
          rotX: 0,
          rotY: 180,
          rotZ: 180,
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
      };
    },
    downloadTabletopSimulatorDeck() {
      const deck = this.getSeparateMainAndSideboard(this.deckCards);

      const objectStates = [];

      if (deck.mainCards.length) {
        objectStates.push(
          this.formatDeckForTabletopSimulator(deck.mainCards, 0)
        );
      }

      if (deck.sideboardCards.length) {
        objectStates.push(
          this.formatDeckForTabletopSimulator(deck.sideboardCards, 3)
        );
      }

      const output = {
        ObjectStates: objectStates,
      };

      this.downloadJSON(output, 'TTSDeck');
    },
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

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
