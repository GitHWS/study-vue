const app = Vue.createApp({
  data() {
    return { enteredGoalValue: '', goals: [] };
  },
  methods: {
    addGoal() {
      // ⚠️ push는 결과값으로 push 후 새로운 아이템이 추가된 배열이 아닌 '배열의 길이(length)'를 반환한다.
      // this.goals = this.goals.push(this.enteredGoalValue) 시 goals 배열의 길이가 반환되어 this.goals의 값이 되므로 배열을 얻고 싶다면 위와 같이 하면 안된다.
      if (this.enteredGoalValue.trim() === '') {
        alert('Please enter your goal!');
      } else {
        this.goals.push(this.enteredGoalValue);
      }
      this.enteredGoalValue = '';
    },
    // 클릭한 goal의 index를 전달받아 전체 goals 리스트에서 제거한다.
    removeGoal(index) {
      this.goals.splice(index, 1);
    },
  },
});

app.mount('#user-goals');
