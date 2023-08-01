import { createRouter, createWebHistory } from 'vue-router';

import TeamMember from './components/teams/TeamMembers.vue';
import TeamsList from './pages/TeamsList.vue';
import UsersList from './pages/UsersList.vue';
import NotFound from './pages/NotFound.vue';
import TeamsFooter from './pages/TeamsFooter.vue';
import UsersFooter from './pages/UsersFooter.vue';

// SECTION - Router 생성
// NOTE Router 생성을 위해 createRouter 함수를 사용한다.
// 인자로 JavaScript 객체를 입력하는데 이 객체에는 history 옵션과 routes 옵션이 필요하다.
// NOTE history 옵션은 애플리케이션의 라우팅 히스토리를 관리하는 방법을 알려줄 수 있다. 사용자가 다른 곳을 클릭하면 다른 페이지로 넘어가고 해당 페이지가 브라우징 히스토리에 등록되도록 하는 방식을 설정할 수 있다. 예를 들어, 뒤로가기 버튼을 클릭했을 때 히스토리를 통해 라우터가 이전 페이지를 알 수 있다.
// history에 사용할 대표적인 두 가지 함수 중 createWebHistory는 호출하여 라우터에게 사용자가 어디로부터 왔는지에 대한 정보 등을 알려 주는 데에 아무 문제가 없어서 브라우저 내장 메커니즘을 사용하라고 지정한다.
// NOTE routes 옵션은 모든 라우트의 경로, 즉 라우트 기능을 지원하려는 여러 URL을 등록할 수 있다.
const router = createRouter({
  history: createWebHistory(),
  // SECTION - routes 옵션
  // routes 옵션의 값으로 대체적으로 배열이 되며, 배열의 요소로 JavaScript의 객체가 들어가게 되는데 라우팅 경로(path)와 경로에 따라 렌더링할 컴포넌트(component)의 값이 필요하다.
  // NOTE Router 인스턴스에 등록된 컴포넌트는 Router를 통해 컴포넌트에 접근하기 때문에 더이상 전역 컴포넌트나 지역 컴포넌트로 추가적인 등록할 필요가 없다.
  routes: [
    // SECTION - 특정 도메인에 접속 시 리디렉션
    // redirect 옵션으로 설정된 경로에 접근 시 리디렉션을 통해 다른 도메인으로 자동으로 다시 이동시킨다.
    { path: '/', redirect: '/teams' },
    // NOTE redirect 옵션을 사용하는 대신 alias 옵션으로도 리디렉션이 가능하다. alias 옵션으로 설정된 경로는 설정된 path 옵션의 경로의 별칭(alias)로 취급하는데 alias 경로로 접근 시 path 옵션에 설정된 경로로 리디렉션이 이루어진다.
    // NOTE 하지만 redirect와 다르게 다른 라우트에서 같은 컴포넌트를 로드하는 것과 동일하기 때문에 alias 옵션의 경우 URL의 변경이 없다는 차이가 있으므로 상황에 따라 선택하여 사용해야한다.
    // { path: '/teams', component: TeamsList, alias: '/' }, // our-domain.com/teams
    // SECTION - 중첩 라우트
    // LINK https://router.vuejs.kr/guide/essentials/nested-routes.html#nested-routes
    // 중첩 라우트는 등록된 라우트 내에 또 다른 라우트를 등록하는 것을 말한다. 기존의 라우트 내부에 등록된 라우트는 자식 라우트가 된다.
    // 중첩 라우트는 children 옵션으로 설정이 가능하며 기본적으로 배열을 가지며 해당 배열 내 라우트를 정의할 수 있다.
    // children에 등록된 중첩 라우트의 경우 component를 로드하지 않는데 그 이유는 vue-router는 해당 컴포넌트를 어디로 로드해야할지 모르기 때문이다.
    // 중첩된 라우트가 로드하는 컴포넌트를 표시하기 위해 부모 라우트가 로드하는 컴포넌트 내에 router-view 컴포넌트를 추가하여 vue-router에게 중첩 라우트가 로드하는 컴포넌트를 어디에 로드할지 알린다.
    // 중첩 라우트의 컴포넌트가 로드되었을 때 페이지를 이동하지 않지만 화면은 변경 사항이 발생하고 URL 또한 변경된다.
    // !SECTION

    {
      // SECTION - 이름 있는 경로(라우트)
      // 라우트에 name 옵션을 통해 이름을 명명할 수 있다.
      name: 'teams',
      // !SECTION
      path: '/teams',

      // SECTION - 라우트의 메타 데이터 활용
      // NOTE 메타 옵션은 바로 라우트 객체나 $route 객체가 있는 곳 모두에서 메타 필드에 액세스할 수 있다. 컴포넌트 내부에서도 사용할 수 있으며 라우트에 로드된 컴포넌트에 데이터를 전닳할 수도 있다.
      // NOTE 또한 네비게이션 가드에서는 to, from 인자(경로 위치 객체)를 통해 액세스할 수 있다.
      // 아래의 예시는 특정 라우트에 meta 옵션을 추가하여 해당 라우트에 인증이 필요하다는 것을 표시하고 있다.
      meta: { needsAuth: true },
      // !SECTION

      // NOTE 이름있는 뷰를 사용하기 위해 components 옵션에 객체의 형태로 키에는 router-view의 식별자, 값으로는 해당 router-view에 로드해야하는 컴포넌트가 된다.
      // NOTE default의 경우 이름이 없는 router-view에게 자동으로 부여되며, 이름이 설정된 경우엔 해당 이름에 맞는 router-view의 위치에 설정된 컴포넌트가 로드된다.
      components: {
        default: TeamsList,
        footer: TeamsFooter,
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMember,
          props: true,
        }, // our-domain.com/teams/t1
      ],
    },
    // !SECTION
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
      },
      // SECTION - 라우트 경로별 네비게이션 가드
      // beforeEach 네비게이션 가드를 각 라우트에 설정하는 방법은 각 route에 beforeEnter 메서드를 추가하는 것이다.
      // 즉 beforeEnter 메서드가 추가된 라우트 경로로 이동할 때마다 beforeEnter 메서드의 내부 코드가 실행된다.
      // 이 메서드도 3개의 인자를 가지는데 beforeEach와 동일하다. 여기서 to는 항상 beforeEnter 메서드가 추가된 라우트의 객체이며 next 함수의 호출은 beforeEnter 메서드가 추가된 라우트의 경로로의 이동을 승인한다.
      beforeEnter(to, from, next) {
        console.log('users beforeEnter');
        console.log(to, from);
        next();
      },
      // !SECTION
    }, // our-domain.com/users
    // SECTION - 동적 파라미터(Params)를 이용한 동적 경로 라우팅
    // 콜론을 사용하여 동적인 경로를 매칭한다. 즉 our-domain.com/team/t1이나 our-domain.com/team/t2처럼 콜론 뒤의 세그먼트는 동적으로 설정할 수 있다. 이러한 세그먼트를 '파라미터(param)'이라 부른다.
    // NOTE 라우트로 로드되는 컴포넌트는 기본적으로 props를 추가하지 않는다. 하지만 만약 라우트로 로드되는 컴포넌트로 props의 전달이 필요하다면 props 옵션을 true로 활성화하여 props를 라우터에 의해 컴포넌트가 로드될 때 자동으로 전달하도록 할 수 있다.
    // props 옵션을 활성화 시 동적 params를 라우트로 인해 로드되는 컴포넌트의 $route 프로퍼티로만 전달되는 것이 아닌 컴포넌트의 props로써 전달되어야한다고 알려주는 역할을 한다.
    // { path: '/teams/:teamId', component: TeamMember, props: true },
    // !SECTION
    // SECTION - 사용자가 지원하지 않는 라우트 경로로 접근하는 경우 catchAll 라우트의 사용
    // LINK https://router.vuejs.kr/guide/essentials/dynamic-matching.html#catch-all-404-not-found-route
    // catchAll 라우트의 경우 다른 라우트의 경로를 덮어쓰지 않기 위해 라우트 중 우선순위가 가장 낮으며, catchAll 라우트보다 우선순위가 높은 라우트로 처리하지 못할 때 catchAll 라우트가 처리한다.
    // redirect 옵션을 통해 리디렉션을 시킬 수도 있으며 별도의 컴포넌트를 연결시켜 로드시킬 수도 있다.
    // NOTE catchAll 라우트의 경우 동적 세그먼트를 이용하기 때문에 임의의 이름을 사용해도 무관하다.
    // { path: '/:catchAll(.*)', redirect: '/teams' },
    { path: '/:catchAll(.*)', component: NotFound },
    // !SECTION
  ],
  // SECTION - 활성 라우터에 추가되는 기본 클래스명 변경
  // 활성화된 라우터에 기본적으로 추가되는 클래스인 'router-link-active'를 설정한 클래스로 변경한다.
  linkActiveClass: 'active-router',
  // 활성화된 라우터에 기본적으로 추가되는 클래스인 'router-link-exact-active'를 설정한 클래스로 변경한다.
  // linkExactActiveClass: '',
  // !SECTION
  // SECTION - scrollBehavior 메서드를 통한 스크롤 동작 제어
  // NOTE scrollBehavior 메서드는 라우트(페이지)가 변경될 때마다 vue-router로 이 메서드를 호출하여 스크롤 동작 제어하는데 3개의 인자(to, from, savedPosition)을 가진다.
  // NOTE to : 이동할 페이지 경로의 라우트 객체, from : 이동하기 전 경로의 라우트 객체, savedPosition : 뒤로가기나 앞으로가기 버튼을 누르기 전 페이지에서 머물렀던 스크롤 위치의 객체
  // savedPosition 인자는 현재 페이지에서 이전 페이지로 돌아갔을 때 '이전 페이지에 있었을 때 스크롤의 원래 위치'로 돌아가려고 할 때 유용하게 사용할 수 있다.
  // scrollBehavior 메서드는 스크롤 위치값을 left, top 프로퍼티를 가진 객체를 반환한다.
  scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
// !SECTION

// SECTION - 네비게이션 가드
// 네비게이션 가드는 인증과 같은 기능을 추가할 때 유용하게 사용할 수 있는데 인증하지 않는 사용자가 특정 라우트에 액세스할 수 없도록 막는 경우를 예로 들 수 있다. 하지만 일부 코드를 실행하고 싶을 때 페이지 변화의 감지에도 유용하며 사용자가 양식을 수정한 것을 저장하지 않은 상태에서 실수로 페이지를 나가지 않도록 방지하는데에도 도움이 된다.
// NOTE 가드란? 네비게이션의 동작(페이지 변경)이 시작될 때 vue-router로 호출하는 함수와 메서드
// NOTE 네비게이션 가드를 연결하는 방법으로 전역, 경로별, 컴포넌트 내부가 있는데 항상 전역 가드가 먼저 실행되고 그 다음으로 경로별, 컴포넌트 내부 순으로 실행된다.

// SECTION - 전역 네비게이션 가드, beforeEach
// NOTE beforeEach는 vue-router에 내장된 메서드로 함수를 인수로 가진다. 이 메서드는 vue-router가 다른 페이지로 이동할 때마다 인자의 함수를 호출한다.
// 이 함수는 라우터로부터 가져온 3개의 인자를 가지는데 이동할 페이지의 라우트 객체인 to, 이동하기 전 페이지의 라우트 객체인 from, 네비게이션 동작을 승인하거나 취소하기 위해 호출해야하는 함수인 next가 있다.
router.beforeEach((to, from, next) => {
  console.log('전역 beforeEach');
  console.log(to, from);

  // 사용자가 가려는 페이지(라우트)의 메타 데이터 needsAuth가 true인지 확인하여 사용자의 인증 여부를 확인할 수 있다.
  // 메타 데이터를 사용하면 아래처럼 개별적인 라우트에 설정된 메타 데이터를 기반으로 다른 동작을 실행할 수 있게 해준다는 장점이 있다.
  if (to.meta.needsAuth) {
    console.log('Needs Auth!');
    next();
  } else {
    next();
  }
  // NOTE 함수인 next는 이동할 페이지로의 이동(네비게이션 동작)을 승인한다. 만약 next 함수를 호출할 때 인자로 false를 전달하면 페이지의 이동을 취소한다.
  // NOTE 또한 경로를 나타내는 문자열이나 위치 객체를 전달할 수도 있다.
  // next();
  // next(false);
  // next('/users');
  // if (to.name === 'team-members') {
  //   next();
  // } else {
  //   next({ name: 'team-members', params: { teamId: 't2' } });
  // }
});
// !SECTION

// SECTION - 전역 네비게이션 가드, afterEach
// NOTE afterEach는 vue-router에 내장된 메서드로 함수를 인수로 가진다. 이 메서드는 모든 페이지 이동에 실행이 되며 한번 실행되면 페이지로의 이동이 승인되기 때문에 next 함수 인자는 필요가 없다. 즉 afterEach 네이비게이션 가드는 페이지로의 이동을 거부할 수 없다.
// 그러므로 페이지 이동이 승인된 후 실행되는 가드라 사용자가 화면에서 볼 내용을 제어할 수 없다.
// afterEach는 이동 액션(action)이나 사용자의 페이지 변경 등을 로그로 남기는 등과 같은 서버에 분석 데이터를 보내는 것이 유용하게 사용할 수 있다.
router.afterEach((to, from) => {
  console.log('Global afterEach');
  console.log(to, from);
});
// !SECTION

// !SECTION

export default router;
