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

// 내 예제
// const app = Vue.createApp({
//   data() {
//     return {
//       messageA: 'Hello, Vue',
//       messageB: '<h2>Bye, Vue</h2>',
//       messageLink: 'https://www.naver.com',
//     };
//   },
//   methods: {
//     outputRandomMessage() {
//       const randomNumber = Math.random();
//       if (randomNumber < 0.5) {
//         return this.messageA;
//       } else {
//         return this.messageB;
//       }
//     },
//   },
// });

// app.mount('#message-container');
