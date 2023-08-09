import { createApp } from 'vue';

import App from './App.vue';
import store from './store/index';

const app = createApp(App);

// NOTE 해당 애플리케이션과 Vuex의 저장소와의 연결
app.use(store);

app.mount('#app');
