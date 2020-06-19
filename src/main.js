import Vue from 'vue';
import App from './components/App.vue';

import {
  getCardDataById,
  getCardDataByName,
  sortCardsByName,
  sortCardsByCMC,
  getTypeFromTypeLine,
} from './utils.js';

Vue.mixin({
  methods: {
    getCardDataById,
    getCardDataByName,
    sortCardsByName,
    sortCardsByCMC,
    getTypeFromTypeLine,
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
