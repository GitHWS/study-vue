import { createApp } from 'vue';

import App from './App.vue';
import loggerMixin from './mixins/logger';

const app = createApp(App);

// NOTE 전역 Mixin 등록
app.mixin(loggerMixin);

app.mount('#app');
