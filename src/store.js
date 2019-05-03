import Vue from 'vue';
import Vuex from 'vuex';
import leantStore from '@/store/local';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS (state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK (state, task) {
      state.tasks.push(task);
    }
  },
  actions: {
    setTasks ({ commit}, tasks) {
      commit('SET_TASKS', tasks);
      leantStore.setItem('stored_tasks', tasks);
    },
    addTask ({ commit, state }, task) {
      commit('ADD_TASK', tasks);
      leantStore.setItem('stored_tasks', state.tasks);
    }
  },
});
