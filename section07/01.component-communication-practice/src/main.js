import { createApp } from 'vue';
import App from './App.vue';
import ActiveUser from './components/ActiveUser.vue';
import UserData from './components/UserData.vue';

const app = createApp(App);

app.component('active-user', ActiveUser);
app.component('user-data', UserData);

app.mount('#app');

// Task 1:
// [x] 컴포넌트 두개 추가하기 : ActiveUser 컴포넌트와 UserData 컴포넌트
// [x] ActiveUser는 h2 태그로 username을, h3 태그로 age를 출력해야한다.
// [x] UserData는 name과 age를 입력을 하는 input을 가져야한다.
// 선택 : 스타일 추가

// Task 2:
// [x] main 앱 템플릿에서 두 컴포넌트를 나란히 출력한다.

// Task 3:
// [x] 사용자 데이터를 추가하고 이름과 연령이 포함되어 있는지 확인한다.
// [x] 사용자 데이터는 ActiveUser 컴포넌트에서 출력해야한다.
// [x] UserData 컴포넌트를 통해 업데이트해야한다.
