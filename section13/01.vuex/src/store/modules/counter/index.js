// NOTE Counter 모듈의 생성 로직을 담는 index.js 파일

import counterMutations from './mutations';
import counterActions from './actions';
import counterGetters from './getters';

// NOTE 모듈을 통한 저장소 구성하기
export default {
  // NOTE 기본적으로 분리된 모듈은 state 옵션에 한해서 지역 상태가 된다. 하지만 namespaced 옵션을 활성화하면 해당 모듈 자체를 지역 모듈로 설정할 수 있다. 네임스페이스를 설정하면 Vuex에게 해당 모듈의 모든 옵션이 지역 상태가 되어야한다고 알린다.
  namespaced: true,
  state() {
    return {
      // NOTE state는 애플리케이션의 전체와 관련된 데이터(전역 상태)를 보유하며 컴포넌트의 data 옵션과 유사하게 상태 객체를 반환하는 메서드이다.
      // 반환하는 상태 객체는 해당 애플리케이션의 상태가 되는데 애플리케이션 전체와 관련된 데이터를 가진다. 이 상태 객체에서 관리하는 전역 상태의 초기값을 정의한다.
      // 여기서 정의된 상태는 애플리케이션 내 모든 컴포넌트에서 접근 가능한 상태가 된다.
      // 분리된 모듈 내의 state는 지역 모듈 상태가 되어 메인 저장소에서 접근할 수 없는 상태가 된다. 당연히 메인 저장소 내에서도 분리된 모듈의 상태에 접근할 수 없다.
      counter: 0,
    };
  },
  mutations: counterMutations,
  actions: counterActions,
  getters: counterGetters,
};
