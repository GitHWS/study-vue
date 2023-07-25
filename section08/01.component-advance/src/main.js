import { createApp } from 'vue';

import App from './App.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseCard from './components/UI/BaseCard.vue';

const app = createApp(App);

// NOTE 전역 컴포넌트(Global Component)로의 등록 : Vue 앱의 어느 템플릿에서나 전역적으로 사용할 수 있는 컴포넌트
// 전역 컴포넌트는 최소한 사용을 고려하되 다양한 곳에서 사용하는 범용 컴포넌트의 경우 사용하는 것이 좋다.
// NOTE 모든 컴포넌트를 전역 컴포넌트 등록을 했을 때 단점
// 단점1 : 각 컴포넌트는 각각의 template, script 코드를 가져 애플리케이션이 커질 수록 코드의 길이가 길어진다. 따라서 컴포넌트가 많아지면 자연스럽게 코드가 길어진다.
// 단점2 : 모든 컴포넌트를 전역 컴포넌트로 등록 시, 애플리케이션이 로드될 때 Vue가 모든 컴포넌트를 전부 로드해야하기 때문에 브라우저는 처음에 모든 컴포넌트 코드를 다운로드해야한다.
// 단점3 : 전역 컴포넌트의 수가 많아지면 모든 컴포넌트가 전역에서 사용할 수 있기 때문에 그만큼 사용처 파악이 힘들어진다.
// 단점4 : 몇 군데만 사용하는 컴포넌트 또한 전역 컴포넌트로 불필요하게 등록한다.
// NOTE 컴포넌트의 목적은 많은 구성요소를 결합하여 복잡한 사용자 인터페이스를 구축하는 것으로 파일을 간결하게 만드는 것을 목적으로 해야한다.
app.component('base-badge', BaseBadge);
app.component('base-card', BaseCard);

app.mount('#app');
