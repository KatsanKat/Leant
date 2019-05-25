import Vue from 'vue';
import Vuex from 'vuex';
import { leantStore } from './store/local';
// import tasks from './model/fake_tasks';

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
          return taskItem = task;
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
  },
  getters: {
    getTasks: state => state.tasks,
    getTaskById: state => id => state.tasks.find(task => task.id === id),
    getTasksByStatus: state => status => state.tasks.filter(task => task.state === status),
  },
});

function getById() {

}
