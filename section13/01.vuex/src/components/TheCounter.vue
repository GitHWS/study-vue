<template>
  <!-- mapGetters 함수의 배열 안의 Getter를 Getter명으로써 template에 출력할 수 있다. -->
  <h3>{{ finalCounter }}</h3>
</template>

<script>
// NOTE Vuex의 mapGetters 함수를 사용하면 저장소 내 getter를 computed 내부에 객체를 전개할 수 있다. 즉 computed 옵션에 병합되는 getter 객체를 제공한다.
import { mapGetters } from 'vuex';

export default {
  // NOTE 저장소 내 상태에 접근하려면 아래와 같이 상태에 접근할 수 있다. $store는 Vuex의 저장소를 가리키며, state는 해당 저장소에 관리하는 상태 프로퍼티로 저장소가 관리하는 모든 상태를 가지고 있다.
  computed: {
    // counter() {
    //   return this.$store.getters.finalCounter;
    // },
    // NOTE mapGetters 함수의 인자로 배열이 전달되는데 이 배열 내에는 computed 옵션으로 받아와야하는 Getter명을 넣으면 된다.
    // 배열이므로 당연히 여러 Getter의 값을 받아올 수 있다. mapGetters 함수로 인해 이 배열 내에 있는 모든 Getter를 자동으로 가리키게 된다.
    // NOTE namespaced가 활성화된 모듈(지역 모듈)에 접근할 때 mapper Helper 함수의 첫번째 인수로 접근하려는 모듈의 namespace를 전달하여 해당 지역 모듈의 Action이나 Getter에 접근할 수 있다.
    ...mapGetters('numbers', ['finalCounter']),
  },
};
</script>
