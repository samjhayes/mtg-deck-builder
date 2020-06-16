<template>
  <span class="mana" :data-color="mana" :style="style">
    {{ mana }}
  </span>
</template>

<script>
export default {
  name: 'Mana',
  props: {
    mana: String,
    size: Number,
  },
  computed: {
    style: function() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../_variables.scss';

.mana {
  background: $colorless;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 12px;

  &[data-color='W'] {
    background-color: $white;
  }

  &[data-color='U'] {
    background-color: $blue;
  }

  &[data-color='B'] {
    background-color: $black;
  }

  &[data-color='R'] {
    background-color: $red;
  }

  &[data-color='G'] {
    background-color: $green;
  }
}
</style>
