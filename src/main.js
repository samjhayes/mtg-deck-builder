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
    processManaCost: manaCost => {
      if (manaCost) {
        let processedManaCost = manaCost;
        processedManaCost = processedManaCost
          .trim()
          .slice(1, processedManaCost.length - 1)
          .split('}{');
        return processedManaCost;
      }
      return [];
    },
    debounce: (fn, delay) => {
      let timeout = null;
      return function() {
        clearTimeout(timeout);
        const args = arguments;
        const that = this;
        timeout = setTimeout(function() {
          fn.apply(that, args);
        }, delay);
      };
    },
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
