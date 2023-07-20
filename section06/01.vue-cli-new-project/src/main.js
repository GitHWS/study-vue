import { createApp } from 'vue';
// 생성한 컴포넌트 불러오기
import App from './App.vue';
import FriendContact from './components/FriendContact.vue';

const app = createApp(App);

// Vue 메인 app 인스턴스에 friend-contact라는 식별자 명으로 컴포넌트를 등록했다.
app.component('friend-contact', FriendContact);

app.mount('#app');
