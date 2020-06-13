import Vue from "vue";
import App from "./components/App.vue";

Vue.mixin({
  methods: {
    getCardDataById: (data, id) => data.find(card => card.id === id)
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
