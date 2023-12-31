const app = Vue.createApp({
  data: function () {
    return {
      courseGoalA: 'Finish Vue Course',
      courseGoalB: '<h2>Master Vue Course</h2>',
      vueLink: 'https://vuejs.org/',
    };
  },
  methods: {
    outputGoal() {
      const randomNumber = Math.random();

      if (randomNumber < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});
app.mount('#user-goal');
