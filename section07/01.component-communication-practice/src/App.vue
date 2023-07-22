<template>
  <active-user :name="user.name" :age="user.age"></active-user>
  <user-data @update-user="updateUser"></user-data>
</template>

<script>
export default {
  data() {
    return {
      user: { name: 'Hyunwoo', age: 29 },
    };
  },
  methods: {
    updateUser(name, age) {
      this.user = {
        name: name,
        age: +age,
      };
    },
  },
};
</script>

<style>
#app form div {
  margin-bottom: 15px;
}

#app label {
  margin-right: 10px;
}
</style>
