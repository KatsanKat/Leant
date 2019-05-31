<template>
  <div
    @click="showModalDelete=true; $emit('is-modal-open', showModalDelete)"
    class="waiting-task">
    <div class="task-dates">
      <deleteTaskModal
        :task="task"
        v-if="showModalDelete"
        @close="showModalDelete=false; $emit('is-modal-open', showModalDelete)"
        @delete-doing-task="deleteDoingTask"
      ></deleteTaskModal>
      <div class="final-date">{{task.plannedDate | moment("DD/MM/YYYY")}}</div>
      <div class="date-left">{{task.plannedDate | moment("from")}}</div>
    </div>
    <div class="taskname">{{task.name}}</div>
  </div>
</template>

<script lang="js">
import deleteTaskModal from '@/components/deleteTaskModal.vue';

export default {
  name: 'doingTask',
  components: {
    deleteTaskModal,
  },
  data() {
    return {
      showModalDelete: false,
    };
  },
  props: {
    task: {},
  },
  methods: {
    deleteDoingTask() {
      console.log(this.task);
      this.$emit('delete-doing-task', this.task);
      this.$store.dispatch('deleteTask', this.task);
    },
  },
};
</script>
