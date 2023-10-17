<template>
  <button
    class="button"
    :class="[
      { button__positive: positiveStyle },
      { button__negative: negativeStyle },
    ]">
    <slot>Button</slot>
  </button>
</template>

<script>
export default {
  props: {
    varient: {
      type: String,
      required: false,
      default: 'positive',
    },
  },
  computed: {
    positiveStyle() {
      if (this.varient === 'positive') {
        return true;
      }
    },
    negativeStyle() {
      if (this.varient === 'negative') {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.button {
  width: 8rem;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  color: var(--white-color);
}

.button__positive {
  background-color: var(--positive-color);
}

.button__positive:hover {
  color: var(--positive-color);
  box-shadow: 0 0 0 2px var(--positive-color);
  background-color: transparent;
}

.button__negative {
  background-color: var(--negative-color);
}

.button__negative:hover {
  color: var(--negative-color);
  box-shadow: 0 0 0 2px var(--negative-color);
  background-color: transparent;
}
</style>
