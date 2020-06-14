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
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
