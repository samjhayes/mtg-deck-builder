<template>
  <main id="app" @click.prevent="resetPreviewCard" @contextmenu.prevent>
    <Browse
      :browse-cards="browseCards"
      :deck-cards="deckCards"
      @add-card-to-deck="addOneCardToDeck"
      @remove-card-from-deck="removeCardFromDeck"
      @update-filters="updateFilters"
      @show-preview-card="showPreviewCard"
    />
    <Deck
      :data="data"
      :deck-cards="deckCards"
      :mode="mode"
      @add-card-to-deck="addOneCardToDeck"
      @remove-card-from-deck="removeCardFromDeck"
      @set-mode="setMode"
      @set-modal="setModal"
      @reset-deck="resetDeck"
      @show-preview-card="showPreviewCard"
    />
    <PreviewCard
      v-if="preview"
      :card="preview.card"
      :x="preview.x"
      :y="preview.y"
      :offsetX="preview.offsetX"
      :offsetY="preview.offsetY"
    />
    <ImportDeckModal
      v-if="activeModal === modals.IMPORT_DECK"
      @set-modal="setModal"
      @close-modal="closeModal"
      @reset-deck="resetDeck"
      @import-deck="importDeck"
    />
    <ImportFinishedModal
      v-if="activeModal === modals.IMPORT_FINISHED"
      :import-added-cards="importAddedCards"
      :import-missing-cards="importMissingCards"
      @close-modal="closeModal"
      @reset-import-cards="resetImportCards"
    />
    <ExportDeckModal
      v-if="activeModal === modals.EXPORT_DECK"
      :deck-cards="deckCards"
      @close-modal="closeModal"
    />
    <Loading :is-loading="isLoading" />
  </main>
</template>

<script>
import Browse from './Browse.vue';
import Deck from './Deck.vue';
import ExportDeckModal from './ExportDeckModal.vue';
import ImportDeckModal from './ImportDeckModal.vue';
import ImportFinishedModal from './ImportFinishedModal.vue';
import Loading from './Loading.vue';
import PreviewCard from './PreviewCard.vue';
import { modals } from '../enums.js';

const MAX_BROWSE_CARDS = 250;

export default {
  name: 'App',
  components: {
    Browse,
    Deck,
    ExportDeckModal,
    ImportDeckModal,
    ImportFinishedModal,
    Loading,
    PreviewCard,
  },
  data() {
    return {
      data: [],
      browseCards: [],
      deckCards: [],
      mode: 'main',
      activeModal: '',
      modals: modals,
      importAddedCards: [],
      importMissingCards: [],
      preview: null,
      isLoading: true,
    };
  },
  methods: {
    resetDeck() {
      this.deckCards = [];
    },
    resetImportCards() {
      this.importAddedCards = [];
      this.importMissingCards = [];
    },
    importDeck(text) {
      this.setIsLoading(true);
      this.closeModal();
      requestAnimationFrame(() => {
        requestAnimationFrame(
          async function() {
            await this.$nextTick();
            this.processDeckImportText(text);
            this.setIsLoading(false);
            this.setModal(modals.IMPORT_FINISHED);
          }.bind(this)
        );
      });
    },
    processDeckImportText(text) {
      const added = [];
      const missing = [];

      const blocks = text.trim().split('\n\n');

      if (blocks.length > 0) {
        const mainCards = this.addCardsToDeckFromText(blocks[0], 'main');
        added.push(...mainCards.added);
        missing.push(...mainCards.missing);
      }

      if (blocks.length > 1) {
        const sideboardCards = this.addCardsToDeckFromText(
          blocks[1],
          'sideboard'
        );
        added.push(...sideboardCards.added);
        missing.push(...sideboardCards.missing);
      }

      this.importAddedCards = added;
      this.importMissingCards = missing;
    },
    addCardsToDeckFromText(text, mode) {
      const added = [];
      const missing = [];

      const re = /^x?(\d+)x? (.+?)( \([A-Z0-9]+\))?( \d+)?$/gm;
      const matches = [...text.matchAll(re)];
      matches.forEach(match => {
        const count = parseInt(match[1]);
        if (count) {
          const name = match[2];
          const card = this.getCardDataByName(this.data, name);
          if (card) {
            this.addCardToDeck(card.id, count, mode);
            added.push({ name: card.name, count });
          } else {
            missing.push({ name, count });
          }
        }
      });

      return {
        added: this.mergeCardsWithSameName(added),
        missing: this.mergeCardsWithSameName(missing),
      };
    },
    addOneCardToDeck(id) {
      this.addCardToDeck(id, 1, this.mode);
    },
    addCardToDeck(id, count, mode) {
      let cardInDeck = this.getCardDataById(this.deckCards, id);
      if (cardInDeck) {
        cardInDeck[`${mode}Count`] += count;
      } else {
        const card = this.getCardDataById(this.data, id);
        if (card) {
          cardInDeck = {
            ...card,
            mainCount: 0,
            sideboardCount: 0,
          };
          cardInDeck[`${mode}Count`] += count;
          this.deckCards.push(cardInDeck);
        }
      }
    },
    removeCardFromDeck(id) {
      const cardInDeck = this.getCardDataById(this.deckCards, id);
      if (cardInDeck) {
        if (cardInDeck[`${this.mode}Count`] > 0) {
          cardInDeck[`${this.mode}Count`] -= 1;
        }

        if (!cardInDeck.mainCount && !cardInDeck.sideboardCount) {
          const index = this.deckCards.indexOf(cardInDeck);
          this.deckCards.splice(index, 1);
        }
      }
    },
    setMode(mode) {
      this.mode = mode;
    },
    setIsLoading(isLoading) {
      this.isLoading = isLoading;
    },
    setModal(modal) {
      this.activeModal = modal;
    },
    closeModal() {
      this.setModal('');
    },
    resetBrowseCards() {
      this.browseCards = [];
    },
    showPreviewCard(args) {
      const { card, event } = args;
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const offsetX = clientX > innerWidth / 2;
      const offsetY = clientY > innerHeight / 2;

      this.preview = {
        card,
        x: clientX,
        y: clientY,
        offsetX,
        offsetY,
      };
    },
    resetPreviewCard() {
      this.preview = null;
    },
    setBrowseCards(cards) {
      this.browseCards = cards.map(
        function(card) {
          return { id: card.id, images: card.images, name: card.name };
        }.bind(this)
      );
    },
    updateFilters(filters) {
      const { search, color } = filters;
      if (search) {
        let results = this.data.filter(card => {
          return card.name.toLowerCase().includes(search.toLowerCase());
        });

        results = this.sortCardsByName(results);

        let activeColors = color.filter(color => color.active);
        activeColors = activeColors.map(color => color.symbol);
        if (activeColors.length) {
          results = results.filter(card => {
            const cardColors = card.colors.length ? card.colors : ['c'];
            let matchingColorsCount = 0;
            for (let i = 0; i < cardColors.length; i += 1) {
              const color = cardColors[i];
              if (activeColors.includes(color)) {
                matchingColorsCount += 1;
              }
            }
            return matchingColorsCount === cardColors.length;
          });
        }

        results = results.slice(0, MAX_BROWSE_CARDS);
        this.setBrowseCards(results);
      } else {
        this.resetBrowseCards([]);
      }
    },
  },
  mounted: async function() {
    const data = await import(
      /* webpackChunkName: "cards" */ '../assets/oracle.min.json'
    );
    this.data = data.default.map(card => ({
      id: card.id,
      name: card.n,
      cmc: card.cc,
      keywords: card.k,
      images: card.i,
      manaCosts: card.mc,
      colors: card.c,
      typeLines: card.t,
      types: this.getTypesFromTypeLines(card.t),
    }));
    this.setIsLoading(false);
  },
};
</script>

<style lang="scss">
$ms-font-path: '~mana-font/fonts';
@import 'mana-font/sass/mana';

@import '../_variables.scss';

* {
  box-sizing: border-box;
  user-select: none;
}

body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

ul,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

input {
  min-height: $min-input-size;
  padding: 5px 10px;
  border: none;
}

button {
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: transparent;
}
</style>
