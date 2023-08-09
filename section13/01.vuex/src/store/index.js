// NOTE 메인 저장소 생성 로직을 담는 index.js 파일

// NOTE Vuex 저장소의 생성
import { createStore } from 'vuex';

import counterModule from './counter/index';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

// NOTE 새로운 저장소 인스턴스를 생성한다. 저장소는 전체 애플리케이션 당 '하나'의 저장소만 가질 수 있다.
const store = createStore({
  // NOTE 기존 저장소에서 분리한 모듈을 저장소와 연결하려면 createStore 메서드 인자의 modules 옵션을 통해 연결할 수 있다.
  // 분리된 모듈은 임의의 key와 함께 추가하면 기존 저장소와 자동으로 결함된다. 분리된 모듈의 옵션은 저장소의 같은 레벨의 동일한 옵션을 찾아 결합된다.
  modules: {
    // NOTE 네임스페이스는 modules 옵션의 key로 설정된 것이 value로 설정한 모듈의 네임스페이스가 된다. 아래의 코드에서 counterModule의 네임스페이스는 numbers이다.
    // 이 네임스페이스를 통해 지역 모듈 내 Action과 Getter 등을 다뤄야한다.
    numbers: counterModule,
  },
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});

export default store;
