import Vue from 'vue';
import Vuex from 'vuex';
import tasks from '@/model/tasks';
import Task from "@/model/Task";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks (state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    setTasks ({ commit}, tasks: Task[]) {
      commit('setTasks', tasks)
    }
  },
});
