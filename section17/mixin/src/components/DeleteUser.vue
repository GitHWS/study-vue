<template>
  <user-alert v-if="alertIsVisible" :title="alertTitle" @close="hideAlert">
    <p>Do you want to continue with deleting a user?</p>
  </user-alert>
  <section>
    <h2>Delete a User</h2>
    <button @click="showAlert">Delete User</button>
  </section>
</template>

<script>
import alertMixin from '../mixins/alert';

export default {
  data() {
    return {
      alertTitle: 'Delete User?',
      // NOTE Mixin 로직과 동일한 data 옵션의 값이 있다면 컴포넌트에 추가된 data 옵션의 값이 우선 순위를 가지기 때문에 Mixin 로직의 data 옵션의 값은 컴포넌트의 data 옵션의 값으로 오버라이드된다.
      alertIsVisible: true,
    };
  },
  mixins: [alertMixin],
};
</script>
