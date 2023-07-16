const app = Vue.createApp({
  data() {
    return {
      counter: 0,
    };
  },
  computed: {
    // result 메서드를 호출하여 반환되는 값을 템플릿에 사용함
    result() {
      if (this.counter < 37) {
        return 'Not there yet';
      } else if (this.counter === 37) {
        return this.counter;
      } else {
        return 'Too much';
      }
    },
  },
  watch: {
    // computed의 result의 '반환값'의 변화가 감지되면 실행
    result(value) {
      console.log('Watcher 실행');
      setTimeout(() => {
        this.counter = 0;
      }, 5000);

      // function 키워드를 사용할 때 this가 가리키는 객체를 상수에 저장하여 같은 대상을 가리키게 함
      // const that = this;
      // setTimeout(function () {
      //   that.counter = 0;
      // }, 5000);
    },
  },
  methods: {
    // button에 이벤트를 반이딩하기 위해 addNumber 메서드 설정
    addNumber(num) {
      this.counter = this.counter + num;
    },
  },
});

app.mount('#assignment');
