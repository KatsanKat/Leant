import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import leantStore from '@/store/local';

Vue.config.productionTip = false;

leantStore.getItem('stored_tasks').then((tasks) => {
  if (tasks === null) {
    store.dispatch('setTasks', [])
  } else {
    store.dispatch('setTasks', tasks)
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
