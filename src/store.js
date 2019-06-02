import Vue from 'vue';
import Vuex from 'vuex';
import { leantStore } from './store/local';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],

  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    UPDATE_TASK(state, { task, getters }) {
      state.tasks.map((taskItem) => {
        if (taskItem.id === getters.getTaskById(task.id)) {
          taskItem = task;
        }
      });
    },
    DELETE_TASK(state, { task, getters }) {
      console.log('deletedTask', task);
      state.tasks.map((taskItem, index) => {
        if (taskItem === getters.getTaskById(task.id)) {
          state.tasks.splice(index, 1);
        }
      });
    },
  },
  actions: {
    setTasks({ commit }, tasks) {
      commit('SET_TASKS', tasks);
      leantStore.setItem('stored_tasks', tasks);
    },
    addTask({ commit, state }, task) {
      commit('ADD_TASK', task);
      leantStore.setItem('stored_tasks', state.tasks);
    },
    updateTask({ commit, getters, state }, task) {
      commit('UPDATE_TASK', { task, getters });
      leantStore.setItem('stored_tasks', state.tasks);
    },
    deleteTask({ commit, getters, state }, task) {
      commit('DELETE_TASK', { task, getters });
      leantStore.setItem('stored_tasks', state.tasks);
    },
  },
  getters: {
    getTasks: state => state.tasks,
    getTaskById: state => id => state.tasks.find(task => task.id === id),
    getTasksByStatus: state => status => state.tasks.filter(task => task.state === status),
  },
});
