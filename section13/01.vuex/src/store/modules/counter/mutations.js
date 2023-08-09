// NOTE Counter 모듈의 Mutations의 분리를 위한 mutations.js 파일

export default {
  // NOTE Mutations은 전역적으로 사용할 수 있는 상태 업데이트 메서드를 정의할 수 있다.
  // NOTE Mutations 내에 정의된 메서드는 현재의 최신 상태(state)를 인자로 받으며 이 인자를 통해 store에 정의된 상태에 접근하여 업데이트할 수 있다.
  // NOTE Mutations의 메서드의 인자인 state는 Vuex에 의해 항상 최신 상태가 보장된다.
  increment(state) {
    state.counter += 2;
  },
  // NOTE mutation의 payload(추가할 수 있는 데이터 패키지)를 통해 commit이 될 때 추가적인 인자를 받아 사용할 수 있다.
  increase(state, payload) {
    state.counter += payload.value;
  },
};
