<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <!-- 자식 컴포넌트에서 부모 컴포넌트로 슬롯의 데이터를 전달하기 위해서 props를 전달하는 것처럼 작성해서 부모 컴포넌트에서 해당 데이터를 참조할 수 있다. -->
      <slot :item="goal" another-prop="..."></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      goals: ['Finish the course', 'Learn Vue'],
    };
  },
};
</script>
