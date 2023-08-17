import { createRouter, createWebHistory } from 'vue-router';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachRegistation from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

// SECTION 라우트 내 비동기 컴포넌트 등록
// NOTE 라우트 내 비동기 컴포넌트 등록을 위한 defineAsyncComponent 함수의 사용을 권장하지 않는다. v-if 등으로 컴포넌트를 조건부 로드할 수 있기 때문이다. 그러므로 defineAsyncComponent 함수를 사용하지 않고 아래와 같은 형식으로 사용하는 것을 권장한다.
const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistation = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/RequestsReceived.vue');
const RequestsReceived = () => import('./pages/coaches/CoachRegistration.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
// !SECTION

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    {
      path: '/register',
      component: CoachRegistation,
      meta: { requiresAuth: true },
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
