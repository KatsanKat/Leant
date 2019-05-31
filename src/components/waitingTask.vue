<template>
  <div
    @click="showModalEdit=true; $emit('is-modal-open', showModalEdit)"
    class="waiting-task">
    <editTaskModal
      :task="task"
      v-if="showModalEdit"
      @close="showModalEdit=false; $emit('is-modal-open', showModalEdit)"
      @delete-waiting-task="deleteWaitingTask"
    ></editTaskModal>
    <div class="task-dates">
      <div class="final-date">{{task.plannedDate | moment("DD/MM/YYYY")}}</div>
      <div class="date-left">{{task.plannedDate | moment("from")}}</div>
    </div>
    <div class="taskname">{{task.name}}</div>
  </div>
</template>

<script lang="js">
import editTaskModal from '@/components/editTaskModal.vue';

export default {
  name: 'waitingTask',
  components: {
    editTaskModal,
  },
  data() {
    return {
      showModalEdit: false,
    };
  },
  props: {
    task: {},
  },
  methods: {
    deleteWaitingTask(task) {
      this.$emit('delete-waiting-task', task);
    },
  },
};
</script>

<style scoped>

</style>
