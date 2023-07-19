// 템플릿을 정의하는 기본적인 방법
const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      // ref를 사용한 엘리먼트 접근할 때 Vue에서 지원하는 프로퍼티 $refs로 접근한다. 참고로 Vue가 지원하는 모든 내장 프로퍼티는 $를 사용한다.
      // $refs는 어떤 엘리먼트에 접근하고자 하는지 기억한 엘리먼트의 식별자의 정보를 담고 있다. 즉, userText라는 식별자가 있는 input DOM 엘리먼트에 접근하는 것이다.
      // console.dir(this.$refs.userText);
      this.message = this.$refs.userText.value;
    },
  },
  // ✅ 생명 주기 훅 메서드의 사용
  // 생명 주기 훅 메서드는 Vue 앱 인스턴스 내부의 data, methods 등과 같은 수준에서 추가할 수 있다.
  beforeCreate() {
    console.log('BeforeCreate');
  },
  created() {
    console.log('Created');
  },
  beforeMount() {
    console.log('BeforeMount');
  },
  mounted() {
    console.log('Mounted');
  },
  beforeUpdate() {
    console.log('BeforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeUnmount() {
    console.log('BeforeUnmount');
  },
  unmounted() {
    console.log('Unmounted');
  },
});

app.mount('#app');

// beforeUnmount, unmounted 메서드 호출을 보기 위한 타이머 설정
setTimeout(() => {
  app.unmount();
}, 3000);

// app2처럼 여러 개의 Vue app 인스턴스를 가질 수 있다.
// 템플릿을 정의하는 또 다른 방법으로 template 프로퍼티의 추가가 있다. 이 방법은 실제로 자주 사용되지 않는다.
const app2 = Vue.createApp({
  template: `
  <p>{{ favoriteMeal }}</p>
  `,
  data() {
    return {
      favoriteMeal: 'Pizza',
    };
  },
});

app2.mount('#app2');

// ✅ Vue 동작 원리
// 1. Vue가 내부에서 Proxy를 활용하여 data 프로퍼티를 포함한 전역 프로퍼티, methods 프로퍼티 등을 하나의 객체(this가 가리키는 대상)로 래핑하고, data 내 프로퍼티에 새로운 값이 할당될 때마다 알리는 작업을 한다.
// 2. Vue가 새로운 값이라는 것을 감지하면 Vue는 제어하는 HTML 코드(mount되는 HTML 코드)를 스캔하고 변경 사항이 있는 프로퍼티가 사용되고 있는지 확인한다.
// 3. 사용자가 보는 화면이 렌더링된 페이지에서 해당 동적 컨텐츠가 표시되는 올바른 위치를 탐색하고 변경 사항에 맞게 화면에 나오는 페이지를 업데이트한다.
// 즉 Vue가 모든 data 프로퍼티를 추적하고 프로퍼티에 변경사항이 발생했을 때 앱에서 HTML 코드 중 해당 프로퍼티의 부분을 업데이트한다.

// ✅ Vue에는 '필요할 때만' DOM 요소로부터 값을 가지고 오는 기능, ref
// ref는 일반 HTML의 속성이 아닌 Vue가 이해하는 속성으로 값으로 임의로 설정하는 문자열이며 이를 식별자로 사용한다.

// 🤔 ref는 왜 사용하나?
// Vue는 ref를 감지하고 내부에 이것을 저장, 즉 사용자가 어떤 엘리먼트에 접근하고자 하는지 기억한다.
// ref를 사용하면 input 이벤트와 같이 모든 키 입력에 반응하여 출력하는 것을 대신해서 값이 필요할 때 접근해서 추출할 때 유용하게 사용할 수 있다.

// ✅ 생명 주기 훅 메서드(Life Cycle Hook Methods)
//  https://v3-docs.vuejs-korea.org/api/options-lifecycle.html
// 생명 주기를 사용하여 원하는 시점에 원하는 코드를 실행 가능하다.
// createApp 메서드와 HTML 코드(DOM)를 mount 메서드로 마운트하여 Vue에게 어디에 렌더링할지에 대한 정보를 알린다.
// Vue 앱 생성 후 화면에 무엇인가 나타나기 시작할 때, 해당 앱이 몇 개의 지점에 도달하는데 이를 생명 주기 단계 라고 할 수 있다.
// 각각의 단계는 특정 메서드에 반영되어 Vue 앱 인스턴스에 추가하여 특정 시점에 코드를 실행할 수 있다.

// 🔖 Vue 앱 인스턴스 생성 시 호출되는 생명 주기 메서드
// beforeCreate : 앱이 완전히 '초기화되기 전' 호출하는 메서드, 화면에 표시되는 것이 없다.
// created : Vue 앱이 내부적으로 초기화가 되었으나, 마운트가 된 상태가 아니기 때문에 화면에 표시되는 것이 없다. 이 단계 이후 template를 컴파일 할 수 있다. 컴파일 과정에서 모든 동적 플레이스홀더, 보간 등이 제거되고 사용자에게 구체적인 값을 대체된다.
// beforeMount : 컴파일 과정이 완료된 후, 마운트 되기 직전의 시점, Vue가 화면에 무언가를 표시하는 직전의 단계로 화면을 통해 볼 수 있게 되기 바로 직전의 단계이다.
// mounted : 화면에 무언가 표시되기 시작한다. 이 단계에서 Vue 앱이 초기화되고 template도 컴파일을 완료한다. Vue가 화면에서 표시된 대상을 인지하는 브라우저에게 지시사항을 넘겨서 브라우저가 이에 따라 Vue 앱이 정의한 대로 모든 콘텐츠가 있는 HTML 엘리먼트(DOM)를 추가한다. 즉 마운트된 Vue 앱 인스턴스가 완성된다.

// 🔖 업데이트 변경 사항 시 호출되는 생명 주기 메서드
// beforeUpdate : Vue 앱 내 업데이트를 완전히 처리되지 않은(변경 사항이 반영되지 않은) 단계
// updated : 해당 업데이트가 완전히 처리되었을 때의 변경 사항이 반영된 단계

// 🔖 마운트 해제 시 호출되는 생명 주기 메서드
// 이 두가지 메서드는 clean-up 코드를 실행할 때 사용하고 주로 서버에 HTTP 요청을 보내 마운트 해제되는 앱을 추적한다.
// beforeUnmount : 콘텐츠 삭제 직전의 실행 단계
// unmounted : 콘텐츠 삭제 후 실행되는 단계
