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
import { ref } from 'vue';

import useAlert from '../hooks/alert';
import UserAlert from './UserAlert.vue';

export default {
  components: {
    UserAlert,
  },
  setup() {
    const alertTitle = ref('Delete User?');
    // NOTE Custom Composition Function의 배열을 구조 분해를 통해 반환값을 가져온다.
    const [alertIsVisible, showAlert, hideAlert] = useAlert(true);

    // template에 제공하기 위해 해당 값을 반환한다.
    return { alertTitle, alertIsVisible, showAlert, hideAlert };
  },
};
</script>
