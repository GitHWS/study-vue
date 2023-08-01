import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// SECTION - Router의 사용
// NOTE Vue 앱에 서드 파티 패키지와 다른 기능을 연결하기 위해 use 메서드를 사용하여 Vue 앱과 Router와 연결한다.
app.use(router);
// !SECTION

app.mount('#app');
