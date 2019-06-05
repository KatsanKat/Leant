<template>
  <div
    @click="showModalDelete=true; $emit('is-modal-open', showModalDelete)"
    class="doing-task">
    <deleteTaskModal
      :task="task"
      v-if="showModalDelete"
      @close="showModalDelete=false; $emit('is-modal-open', showModalDelete)"
      @delete-doing-task="deleteDoingTask"
    ></deleteTaskModal>
    <div class="dotted-container">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="task-name">{{task.name}}</div>
    <div class="task-dates">
      <div class="final-date">{{task.plannedDate | moment("DD/MM/YYYY")}}</div>
      <div class="date-left">{{task.plannedDate | moment("from")}}</div>
    </div>
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
      this.$emit('delete-doing-task', this.task);
      this.$store.dispatch('deleteTask', this.task);
    },
  },
};
</script>

<style lang="scss">
.doing-task {
  background: linear-gradient(90deg, rgba(185, 179, 247, 0.9) 0%, rgba(177, 244, 207, 0.9) 100%);;
}
</style>
