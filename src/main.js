import Vue from 'vue';
import App from './components/App.vue';

Vue.mixin({
  methods: {
    getCardDataById: (data, id) => data.find(card => card.id === id),
    sortCardsByName: cards =>
      cards.sort(function(a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      }),
    sortCardsByCMC: cards =>
      cards.sort(function(a, b) {
        if (a.cmc > b.cmc) return 1;
        if (a.cmc < b.cmc) return -1;

        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
      }),
    getTypeFromTypeLine: typeLine => {
      const lower = typeLine.toLowerCase();
      if (lower.includes('land')) {
        return 'land';
      }
      if (lower.includes('creature') || lower.includes('summon')) {
        return 'creature';
      }
      if (lower.includes('artifact')) {
        return 'artifact';
      }
      if (lower.includes('planeswalker')) {
        return 'planeswalker';
      }
      if (lower.includes('instant') || lower.includes('interrupt')) {
        return 'instant';
      }
      if (
        lower.includes('sorcery') ||
        lower.includes('enchantment') ||
        lower.includes('enchant creature')
      ) {
        return 'sorcery';
      }
      return '';
    },
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
