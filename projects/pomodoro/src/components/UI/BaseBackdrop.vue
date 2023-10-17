<template>
  <div class="backdrop">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.backdrop {
  display: grid;
  place-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100%;
}
</style>
