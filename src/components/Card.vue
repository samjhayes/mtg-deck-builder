<template>
  <div :class="'card ' + card.colors.join(' ')">
    <span class="card-name">{{ card.name }}</span>
    <Mana :mana="card.mana" />
    <span class="card-type">{{ card.type }}</span>
    <span class="card-subtypes">{{ card.subtypes.join(" ") }}</span>
    <span class="card-set">{{ card.set }}</span>
    <span class="card-text">{{ card.text }}</span>
  </div>
</template>

<script>
import Mana from "./Mana.vue";

export default {
  name: "Card",
  components: {
    Mana
  },
  props: {
    card: Object
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 63px * 4;
  height: 88px * 4;
  background: darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
