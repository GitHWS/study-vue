// NOTE 메인 저장소의 Counter 모듈의 Actions 분리를 위한 actions.js 파일

export default {
  login(context) {
    context.commit('setAuth', { isAuth: true });
  },
  logout(context) {
    context.commit('setAuth', { isAuth: false });
  },
};
