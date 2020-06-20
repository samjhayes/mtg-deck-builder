import Vue from 'vue';
import App from './components/App.vue';

import {
  getCardDataById,
  getCardDataByName,
  sortCardsByName,
  sortCardsByCMC,
  getTypeFromTypeLine,
  getTypesFromTypeLines,
  getTotalCardCount,
  mergeCardsWithSameName,
} from './utils.js';

Vue.mixin({
  methods: {
    getCardDataById,
    getCardDataByName,
    sortCardsByName,
    sortCardsByCMC,
    getTypeFromTypeLine,
    getTypesFromTypeLines,
    getTotalCardCount,
    mergeCardsWithSameName,
  },
});

Vue.filter('pluralize', (count, text) => {
  const intCount = parseInt(count);
  const s = intCount > 1 || intCount === 0 ? 's' : '';
  return `${count} ${text}${s}`;
});

new Vue({
  render: h => h(App),
}).$mount('#app');
