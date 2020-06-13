<template>
  <div id="app">
    <Browse
      :data="data"
      :browseCards="browseCards"
      :deckCards="deckCards"
    ></Browse>
    <Deck :data="data" :deckCards="deckCards"></Deck>
  </div>
</template>

<script>
import Browse from "./Browse.vue";
import Deck from "./Deck.vue";

export default {
  name: "App",
  components: {
    Browse,
    Deck
  },
  data() {
    return {
      browseCards: [1, 2, 3],
      deckCards: [
        {
          id: 1,
          mainCount: 2,
          sideboardCount: 1
        },
        {
          id: 3,
          mainCount: 4,
          sideboardCount: 0
        }
      ],
      data: [
        {
          id: 1,
          name: "test1",
          mana: ["R", "G", 2],
          cmc: 4
        },
        {
          id: 2,
          name: "test2",
          mana: ["U", "B"],
          cmc: 2
        },
        {
          id: 3,
          name: "test3",
          mana: ["W", "W", 3],
          cmc: 5
        }
      ]
    };
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
