import Vue from 'vue';
import Vuex from 'vuex';
import tasks from './model/tasks';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: tasks
  },
  mutations: {

  },
  actions: {

  },
});
