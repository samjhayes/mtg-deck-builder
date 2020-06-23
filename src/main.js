import Vue from 'vue';
import App from './components/App.vue';

const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./_variables.scss');

import {
  downloadJSON,
  getCardDataById,
  getCardDataByName,
  getSeparateMainAndSideboard,
  getTypeFromTypeLine,
  getTypesFromTypeLines,
  getTotalCardCount,
  sortCardsByCMC,
  sortCardsByName,
  sortColors,
  mergeCardsWithSameName,
} from './utils.js';

Vue.mixin({
  methods: {
    downloadJSON,
    getCardDataById,
    getCardDataByName,
    getSeparateMainAndSideboard,
    getTypeFromTypeLine,
    getTypesFromTypeLines,
    getTotalCardCount,
    sortCardsByCMC,
    sortCardsByName,
    sortColors,
    mergeCardsWithSameName,
  },
  data() {
    return {
      get theme() {
        return theme;
      },
    };
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
