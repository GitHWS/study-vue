<template>
  <!-- 별칭으로 설정한 Action을 사용할 수 있다. -->
  <button @click="inc">Add 2</button>
  <!-- 저장소에서 추출한 Action 이름을 이벤트의 함수로써 직접 사용할 수 있고 payload도 동일하게 사용할 수 있다. -->
  <button @click="increase({ value: 11 })">Add 11</button>
</template>

<script>
// NOTE mapActions는 methods 내에서 호출하며 저장소 내 존재하는 Action을 가져와서 사용할 수 있다.
import { mapActions } from 'vuex';

export default {
  methods: {
    // addOne() {
    //   this.$store.dispatch('increment');
    // },
    // methods 내에서 호출하여 필요한 Action을 배열 인자 내에 식별자로 추가하여 사용할 수 있다.
    // ...mapActions(['incremnet', 'increase']),
    // NOTE mapActions으로 가져온 Action을 별칭으로써 등록하여 사용할 수 있는데 배열이 아닌 객체를 인자로 전달하면 된다. 이 객체에서 설정한 key가 해당 Action의 별칭이 된다.
    ...mapActions('numbers', {
      inc: 'increment',
      increase: 'increase',
    }),
  },
};
</script>
