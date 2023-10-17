<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  width: 30vw;
  border-radius: 1rem;
  padding: 2rem;
  background: var(--white-color);

  color: #333;
}
</style>
