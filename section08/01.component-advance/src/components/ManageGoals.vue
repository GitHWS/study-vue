<template>
  <!-- Vue는 복수의 상위 요소를 가질 수 있기 때문에 하나의 래핑 요소로 감쌀 필요가 없다. 즉, 프레그먼트를 지원하고 있다. -->
  <h2>Manage Goals</h2>
  <input type="text" ref="goal" />
  <button @click="setGoal">Set Goal</button>
  <!-- Modal의 경우 컴포넌트 내부보단 DOM의 최상위에 위치하는 것이 좋으므로 옮겨줘야하는데 Vue는 teleport를 사용한다. -->
  <!-- teleport로 DOM의 위치를 변경할 HTML을 감싸고 to 속성으로 감싼 HTML을 렌더할 위치 엘리먼트를 CSS 선택자 형태로 입력하면 옮길 수 있다. -->
  <teleport to="body">
    <error-alert v-if="inputIsInvalid">
      <h2>Input is invalid!</h2>
      <p>Please enter at least a few characters...</p>
      <button @click="confirmError">Okay</button>
    </error-alert>
  </teleport>
</template>

<script>
import ErrorAlert from './ErrorAlert.vue';

export default {
  components: {
    ErrorAlert,
  },
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  methods: {
    setGoal() {
      const enteredGoal = this.$refs.goal.value;
      if (enteredGoal === '') {
        this.inputIsInvalid = true;
      }
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>
