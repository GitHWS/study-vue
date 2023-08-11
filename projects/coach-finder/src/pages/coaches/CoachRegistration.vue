<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form
    ></base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm';

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      // NOTE push는 현재 경로를 히스토리 스택에 푸시하여 뒤로가기로 다시 접근 가능하며, replace는 현재 경로를 자체를 대체하기 때문에 히스토리 스택에 푸시되지 않아 뒤로가기로 다시 접근할 수 없다는 차이가 있다.
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style></style>
