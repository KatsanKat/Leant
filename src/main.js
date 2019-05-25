import Vue from 'vue';
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import moment from 'moment';
import VueMoment from 'vue-moment';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { leantStore } from './store/local';

Vue.use(VueMoment, {
  moment,
});
Vue.use(VuejsDialog);

moment.updateLocale('fr', {
  relativeTime: {
    future: '%s restant(e.s)',
    past: 'il y a %s',
    s: 'quelques secondes',
    ss: '%d seconds',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'une journée',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'une année',
    yy: '%d année',
  },
});

Vue.config.productionTip = false;

leantStore.getItem('stored_tasks').then((tasks) => {
  if (tasks === null) {
    store.dispatch('setTasks', []);
  } else {
    store.dispatch('setTasks', tasks);
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
