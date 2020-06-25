<template>
  <div class="loading" v-if="isLoading">
    <div class="spinner">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <span class="text">Loading</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    isLoading: Boolean,
  },
};
</script>

<style lang="scss">
@import '../_variables.scss';

.loading {
  color: white;
  background-color: $modal-background;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.spinner {
  width: $min-input-size;
  height: $min-input-size;
  position: relative;
  animation: spin 2.5s infinite linear both;
  margin-bottom: 20px;
}

.dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: dot 2s infinite ease-in-out both;

  &:before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: white;
    border-radius: 100%;
    animation: dot-before 2s infinite ease-in-out both;
  }

  &:nth-child(1) {
    animation-delay: -1.1s;
  }
  &:nth-child(2) {
    animation-delay: -1s;
  }
  &:nth-child(3) {
    animation-delay: -0.9s;
  }
  &:nth-child(4) {
    animation-delay: -0.8s;
  }
  &:nth-child(5) {
    animation-delay: -0.7s;
  }
  &:nth-child(6) {
    animation-delay: -0.6s;
  }
  &:nth-child(1):before {
    animation-delay: -1.1s;
  }
  &:nth-child(2):before {
    animation-delay: -1s;
  }
  &:nth-child(3):before {
    animation-delay: -0.9s;
  }
  &:nth-child(4):before {
    animation-delay: -0.8s;
  }
  &:nth-child(5):before {
    animation-delay: -0.7s;
  }
  &:nth-child(6):before {
    animation-delay: -0.6s;
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}
</style>
