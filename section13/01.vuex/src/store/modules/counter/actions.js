// NOTE Counter 모듈의 Actions의 분리를 위한 actions.js 파일

export default {
  // NOTE action은 저장소 내 비동기 코드를 다루기 위해 사용된다. 컴포넌트는 Action을 트리거하고 Action은 Mutation을 트리거하여 비동기 코드를 처리한다.
  // NOTE 모든 action은 Vuex로부터 자동으로 context라는 객체 인자를 전달받는다.
  // NOTE Action의 이름을 다르게 하는 경우도 있지만 컴포넌트와 Mutation 사이에 Action을 넣기 때문에 Mutation과 Action의 이름은 같을 수 있다.
  increment(context) {
    setTimeout(() => {
      context.commit('increment');
    }, 2000);
  },
  // NOTE 비동기식으로 실행할 Mutation과 추가적으로 전달할 데이터 payload를 전달할 수 있다.
  increase(context, payload) {
    setTimeout(() => {
      context.commit('increase', payload);
    }, 2000);
  },
};
