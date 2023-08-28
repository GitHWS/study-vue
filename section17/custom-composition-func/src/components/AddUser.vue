<template>
  <user-alert v-if="alertIsVisible" title="Add a User?" @close="hideAlert">
    <p>Do you want to continue with adding a user?</p>
  </user-alert>
  <section>
    <h2>Add a User</h2>
    <button @click="showAlert">Add User</button>
  </section>
</template>

<script>
import useAlert from '../hooks/alert';
import UserAlert from './UserAlert.vue';

export default {
  components: {
    UserAlert,
  },
  setup() {
    // NOTE Custom Composition Function의 배열을 구조 분해를 통해 반환값을 가져온다.
    const [alertIsVisible, showAlert, hideAlert] = useAlert();

    // template에 제공하기 위해 해당 값을 반환한다.
    return { alertIsVisible, showAlert, hideAlert };
  },
};
</script>
