<template>
  <div>
    <h2>사용자명 : {{ name }}</h2>
    <h3>나이 : {{ age }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
};
</script>
