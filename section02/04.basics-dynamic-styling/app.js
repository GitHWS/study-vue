const app = Vue.createApp({
  data() {
    return {
      boxASelected: false,
      boxBSelected: false,
      boxCSelected: false,
    };
  },
  watch: {
    boxASelected(newValue, oldValue) {
      console.log(`BoxA의 값이 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
    },
    boxBSelected(newValue, oldValue) {
      console.log(`BoxB의 값이 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
    },
    boxCSelected(newValue, oldValue) {
      console.log(`BoxC의 값이 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
    },
  },
  computed: {
    boxClasses() {
      return { active: this.boxASelected };
    },
  },
  methods: {
    boxSelected(box) {
      if (box === 'A') {
        this.boxASelected = !this.boxASelected;
      } else if (box === 'B') {
        this.boxBSelected = !this.boxBSelected;
      } else if (box === 'C') {
        this.boxCSelected = !this.boxCSelected;
      }
    },
  },
});

app.mount('#styling');
