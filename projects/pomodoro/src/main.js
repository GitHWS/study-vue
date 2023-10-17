import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseBackdrop from './components/UI/BaseBackdrop.vue';
import BaseButton from './components/UI/BaseButton.vue';

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-backdrop', BaseBackdrop);
app.component('base-button', BaseButton);

app.mount('#app');
