<template>
  <form @submit.prevent="submitData">
    <div>
      <label>사용자명</label>
      <input type="text" v-model="enteredName" />
    </div>
    <div>
      <label>나이</label>
      <input type="text" v-model="enteredAge" />
    </div>
    <button>제출하기</button>
  </form>
</template>

<script>
export default {
  emits: ['update-user'],
  data() {
    return {
      enteredName: '',
      enteredAge: '',
    };
  },
  methods: {
    submitData() {
      this.$emit('update-user', this.enteredName, this.enteredAge);
      this.enteredName = '';
      this.enteredAge = '';
    },
  },
};
</script>
