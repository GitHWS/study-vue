// NOTE 메인 저장소의 Getters의 분리를 위한 getters.js 파일

export default {
  userIsAuthenticate(state) {
    return state.isLoggedIn;
  },
};
