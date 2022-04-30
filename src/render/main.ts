import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import router from './router';
import store, { key } from './store';

const app = createApp(App);
app
  .use(ElementPlus)
  .use(store, key)
  .use(router)
  .mount('#app');
