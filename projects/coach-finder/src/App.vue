<template>
  <the-header></the-header>
  <!-- NOTE 동적으로 렌더링되는 컴포넌트에 접근하려할 때 v-slot의 slotProps의 Component 프로퍼티를 통해 route 경로에서 렌더링되는 컴포넌트를 얻을 수 있다. -->
  <!-- NOTE Transition 처리 시 자식 컴포넌트는 반드시 단 하나의 최상위 레벨의 루트 엘리먼트를 가지고 있어야한다. -->
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

/* Transition CSS 클래스 */
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
