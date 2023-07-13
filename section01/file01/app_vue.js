// Vue CDN을 사용하여 Vue 전역 객체를 호출
Vue.createApp({
  // data 함수 내에서 애플리케이션에서 사용할 데이터를 정의한다.
  data() {
    return {
      // 애플리케이션에서 사용할 데이터의 초기값을 설정한다.
      goals: [],
      enteredValue: '',
    };
  },
  // method 프로퍼티에서 애플리케이션에서 사용할 메서드와 함수를 정의할 수 있다.
  methods: {
    addGoal() {
      this.goals.push(this.enteredValue);
      this.enteredValue = '';
    },
  },
}).mount('#app');
