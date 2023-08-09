// NOTE 메인 저장소의 Mutations의 분리를 위한 mutations.js 파일

export default {
  setAuth(state, payload) {
    state.isLoggedIn = payload.isAuth;
  },
};
