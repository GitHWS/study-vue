let timer;

export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDe1c4qXaEQDSoa57QCYJwYgg2JfxGvM6E';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe1c4qXaEQDSoa57QCYJwYgg2JfxGvM6E';
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Login. Check your login data.'
      );
      throw error;
    }

    // SECTION 토큰 만료로 인한 로그아웃 로직
    // NOTE 로그인 시 얻을 수 있는 토큰의 만료시간을 밀리초로 변환하여 사용한다.
    const expiresIn = +responseData.expiresIn * 1000;
    // NOTE 밀리초로 변환한 토큰의 만료시간을 밀리초인 현재 시간에 더하여 만료 시간을 계산한다.
    const expirationDate = new Date().getTime() + expiresIn;

    // NOTE 새로고침 시 Vuex가 재시작되어 모든 데이터가 사라지는 것을 방지하기 위해 브라우저의 LocalStorage에 저장
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    // NOTE
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    // !SECTION

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    // NOTE 남은 만료 시간을 계산하여 다시 토큰 만료 타이머를 생성
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  logout(context) {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
