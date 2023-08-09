<template>
  <base-container title="Vuex" v-if="isAuth">
    <the-counter></the-counter>
    <favorite-value></favorite-value>
    <button @click="addOne">Add 10</button>
    <change-counter></change-counter>
  </base-container>
  <base-container title="Auth">
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue';
import ChangeCounter from './components/ChangeCounter.vue';
import FavoriteValue from './components/FavoriteValue.vue';
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavoriteValue,
    UserAuth,
  },
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticate;
    },
  },
  methods: {
    // NOTE store 내에 상태 업데이트 mutation은 아래와 같이 commit 메서드를 통해 수행하고자 하는 모든 컴포넌트에서 호출할 수 있다.
    // NOTE mutation에 추가적으로 전달할 인자는 두번째 인자부터 commit할 메서드의 payload에 전달할 수 있다.
    addOne() {
      // 일반적인 방식의 payload 전달
      // this.$store.commit('increase', { value: 10 }
      // Object-style commit, 인자로 전달되는 객체는 type 프로퍼티가 가리키는 메서드의 payload로써 전달된다.
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10,
      // });
      // NOTE Action의 비동기식 코드의 실행을 위해 commit과 동일한 방식으로 dispatch를 사용한다.
      // this.$store.dispatch('increment', { value: 10 });
      this.$store.dispatch({
        // NOTE dispatch에서 namespaced가 활성화된 지역 모듈에 접근할 때도 type의 값으로 namespace를 슬래시 앞에 추가하여 접근할 수 있다.
        type: 'numbers/increase',
        value: 10,
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
