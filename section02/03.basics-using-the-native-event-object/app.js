const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: '',
      lastName: '',
      // fullname: '',
    };
  },
  // computed = computed에서 정의된 메서드는 다른 방식으로 호출되고 실행됨(반환하는 값이 변하지 않으면 이전에 반환한 값을 기억해두었다가 그 값을 그대로 다시 사용)
  // 출력값을 동적으로 계산할 때는 computed 프로퍼티가 유용하다.
  // computed의 메서드는 data의 value처럼 메서드를 호출하지 않고(fullname O => fullname() X) 사용하는데 그것 때문에 Vue는 HTML 코드에서 우선적으로 data가 반환하는 객체 내에서 해당 값을 찾은 후 없다면 computed에서 다시 값을 찾아 실행한다.
  // computed 프로퍼티를 사용하면 Vue는 연산 프로퍼티의 의존성을 인식한다.
  // 즉, fullname의 경우 name이 의존성으로 Vue는 인식한다. computed 프로퍼티의 값을 캐시에 저장하고 computed의 의존성(name) 값이 변경된 경우에만 재계산하고 재평가된다.
  // 성능적인 부분에서 값을 출력하는 대부분의 경우 methods보다 computed를 사용하는 것이 좋다.
  // 페이지에서 의존성에 관계없이 어떤 항목이 변경되든 값을 재계산하려는 경우에만 methods의 사용을 권장한다.
  // methods의 사용이 필요한 경우로는 이벤트가 발생하면 특정 메서드가 트리거되길 원하는 때이다. 이벤트(v-on의 사용)에 computed 프로퍼티를 사용하지 않고 methods를 사용한다.

  // computed와 비슷한 동작을 하는 Watcher(감시자) : 기본적으로 의존성 중 하나가 변경될 때 Vue에 실행하도록 지시할 수 있다. computed 프로퍼티 대용으로써 사용 가능하다.
  // 하지만 대용으로 사용하면 문제가 발생한다. 첫번째, computed 프로퍼티의 개념이 더 이해하기 쉽다. 두번째, computed 프로퍼티가 하나 이상의 의존성을 사용할 때 발생한다. computed 프로퍼티를 사용할 때보다 더욱 많은 코드를 작성해야한다는 것이다.

  // Watcher의 주요 용도 : 카운터가 50을 초과 시 재설정하는 것과 같은 어떤 일이 발생하면 값을 변경해야하는 상황이나 특정 데이터가 변경되면 보내는 HTTP 요청, 특정 값이 변경되면 설정하는 타이머 등에서 유용하게 사용된다. 즉, data 프로퍼티를 업데이트하지만 조건에 따라 항상 업데이트해서는 안되는 로직을 실행하려고 하는 경우에 유용하다.
  // 모든 프로퍼티 변화가 아닌 일부 프로퍼티의 변화에 반응하여 data 프로퍼티를 업데이트하려는 경우. 즉, 뭔가가 변경되어 코드를 실행할 땐 Watcher가 유용하다. 반면에 출력값을 동적으로 계산할 때는 computed 프로퍼티를 사용하는 것이 좋다.

  // Watcher의 동작 방식 : watcher는 Vue 앱 인스턴스 내에 'watch'라는 고유한 프로퍼티(임의 변경 불가)를 생성하여 사용할 수 있다.
  // watcher는 값으로 객체를 가지며 객체 내에선 메서드로 구성된다. 내부의 메서드명은 data와 computed 프로퍼티에서 사용한 이름을 watcher 내 메서드명으로 사용할 수 있다. 기술적인 문제가 발생하지 않는다.
  // data나 computed에서 사용한 이름을 watcher의 메서드명으로 중복되게 사용함으로써 연결을 설정한다.
  // 반환값을 사용하기 위해 HTML 코드에 watcher 메서드를 사용하는 것은 아니기 때문에 Watcher의 메서드 내에선 반환하는 것은 없으므로 return을 사용하지 않는다.
  // watcher 메서드는 자동으로 data/computed와 연결된 watch 프로퍼티의 마지막 값을 인수로써 Vue에 의해 자동으로 전달된다.
  computed: {
    fullname() {
      console.log('Running again');
      if (this.name === '' || this.lastName === '') {
        return '';
      }
      return this.name + ' ' + this.lastName;
    },
  },
  watch: {
    counter(value) {
      if (value > 50) {
        const that = this;
        setTimeout(function () {
          that.counter = 0;
        }, 2000);
      }
    },
    // data의 name의 값이 변경될 때마다 name이라는 이름의 watcher 메서드는 Vue에 의해 재실행된다.
    // watcher 메서드의 인수인 value는 data의 name의 마지막 값을 가져온다.
    // 두개의 인자를 가질 때는 연결된 data의 value의 newValue(새로운 값)와 oldValue(이전 값)이다.
    // 즉 아래의 name 메서드는 data인 name의 값이 변경되면 fullname의 값이 업데이트된다.
    // name(value) {
    //   if (value === '') {
    //     this.fullname = '';
    //   } else {
    //     this.fullname = value + ' ' + this.lastName;
    //   }
    // },
    // lastName(value) {
    //   if (value === '') {
    //     this.fullname = '';
    //   } else {
    //     this.fullname = this.name + ' ' + value;
    //   }
    // },
  },
  methods: {
    outputFullname() {
      console.log('Running again');
      if (this.name === '') {
        return '';
      }
      return this.name + ' ' + 'Schwarzmüller';
    },
    setName(event, lastName) {
      this.name = event.target.value;
    },
    add(num) {
      this.counter = this.counter + num;
    },
    reduce(num) {
      this.counter = this.counter - num;
      // this.counter--;
    },
    resetInput() {
      this.name = '';
    },
  },
});

app.mount('#events');
