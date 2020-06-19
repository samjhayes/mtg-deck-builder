import Vue from 'vue';
import App from './components/App.vue';

import {
  getCardDataById,
  getCardDataByName,
  sortCardsByName,
  sortCardsByCMC,
  getTypeFromTypeLine,
  getTypesFromTypeLines,
} from './utils.js';

Vue.mixin({
  methods: {
    getCardDataById,
    getCardDataByName,
    sortCardsByName,
    sortCardsByCMC,
    getTypeFromTypeLine,
    getTypesFromTypeLines,
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
