// NOTE Counter 모듈의 Getters를 분리하기 위한 getters.js

export default {
  // NOTE 만약 메인 저장소 내 지역 상태인 state에 접근해야한다면 rootState라는 인자를 통해 메인 저장소의 state에 접근할 수 있다.
  testAuth(state, getters, rootState, rootGetters) {
    console.log(getters, rootState, rootGetters);
    return state.isLoggedIn;
  },
  // NOTE state의 계산된 값의 중복을 막기 위해 Getter를 사용한다.
  finalCounter(state) {
    return state.counter * 3;
  },
  // NOTE Getter는 다른 getter에 두번째 인자인 getters를 통해 접근이 가능하다. 이 getters 인자는 객체 형태로 저장소 내에서 관리하는 모든 getters를 포함한다.
  normalizeCounter(_, getters) {
    const finalCounter = getters.finalCounter;

    if (finalCounter < 0) {
      return 0;
    }

    if (finalCounter > 100) {
      return 100;
    }

    return finalCounter;
  },
};
