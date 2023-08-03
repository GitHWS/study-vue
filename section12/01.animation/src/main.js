import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import BaseModal from './components/BaseModal.vue';

const app = createApp(App);

app.component('base-modal', BaseModal);

app.use(router);

// SECTION - router의 초기 transition 애니메이션 막기(페이지가 처음 로드되었을 때 해당 페이지에서 애니메이션이 발생하는 것)
// NOTE router와 transition을 함께 사용하면 처음 경로('/')의 컴포넌트가 자동으로 로드되므로 라우트의 전환(페이지 이동)이 아님에도 초기 로드로 인해 자동으로 transition 애니메이션이 발생한다. 이를 막기 위해 아래의 메서드를 사용할 수 있다.
// NOTE router의 isReady 메서드는 적절한 페이지가 로드되고 이를 라우터가 성공적으로 확인했을 때 알려준다. 이 메서드는 Promise를 반환하므로 then 메서드 등을 사용하여 처리할 수 있다.
// 라우터는 빈 페이지로 선택될 페이지로 이동하는 대신 isReady().then 메서드에 전달되는 함수 덕분에 로드되어야 할 페이지를 인식하여 초기 transition 애니메이션을 수행하지 않도록 한다.
// NOTE 아래의 코드는 라우터가 완전히 설정되고 로드할 페이지를 인식했을 경우에만 앱을 마운트 및 렌더링하도록 하여 라우트의 전환(페이지 전환)에만 transition 애니메이션이 적용된다.
// NOTE Vue Router는 비동기적으로 라우터 초기화를 수행하는데 이것 때문에 라우터의 초기화보다 컴포넌트의 로드가 먼저 이루어지는 상황이 있는데 이로 인해 불필요한 초기 transition 애니메이션이 발생한다. 그래서 router.isReady 메서드를 사용하여 라우트의 초기화를 기다린 후 완료가 되면 then 블록 내 로직을 실행한다. 즉, router의 초기화가 완전히 완료된 후 앱을 마운트하여 초기 컴포넌트 로드 시 발생하는 애니메이션을 막을 수 있다.
router.isReady().then(() => {
  app.mount('#app');
});
// !SECTION
