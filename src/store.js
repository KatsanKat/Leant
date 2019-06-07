import Vue from 'vue';
import Vuex from 'vuex';
import { leantStore } from './store/local';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    experience: {},
    new_user: Boolean,
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
      state.tasks.map((taskItem, index) => {
        if (taskItem === getters.getTaskById(task.id)) {
          state.tasks.splice(index, 1);
        }
      });
    },
    SET_EXPERIENCE(state, experience) {
      state.experience = experience;
      console.log('mutation', state.experience);
    },
    UPDATE_EXPERIENCE(state, experience) {
      console.log('mutation before update', state);
      console.log('mutation before update value', experience);
      state.experience = experience;
      console.log('mutation update', state.experience);
    },
    SET_NEW_USER(state, { isNew }) {
      state.new_user = isNew;
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
    setExperience({ commit }, experience) {
      commit('SET_EXPERIENCE', experience);
      leantStore.setItem('stored_xp', experience);
    },
    updateExperience({ commit, state }, experience) {
      console.log('update', experience);
      console.log('update state', state.experience);
      commit('UPDATE_EXPERIENCE', experience);
      leantStore.setItem('stored_xp', state.experience);
    },
    setNewUser({ commit }, isNew) {
      commit('SET_NEW_USER', isNew);
      leantStore.setItem('new_user', isNew);
    },
  },
  getters: {
    getTasks: state => state.tasks,
    getTaskById: state => id => state.tasks.find(task => task.id === id),
    getTasksByStatus: state => status => state.tasks.filter(task => task.state === status),
    experience: state => state.experience,
  },
});
