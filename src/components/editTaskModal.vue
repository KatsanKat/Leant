<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h1>Modifier l'objectif !</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-input">
                <label for="name">Nom</label>
                <input
                  v-model="task.name"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Refaire le monde...">
              </div>
              <div class="form-input">
                <label for="datetime">Date</label>
                <datetime
                  v-model="task.plannedDate"
                  id="datetime"
                  type="datetime"
                  name="datetime"
                  placeholder="Choisir une date"
                ></datetime>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click.stop="$emit('close'); edit()">
                Modifier
              </button>
              <button class="modal-default-button dissmiss" @click="confirmDelete(task)">
                Supprimer
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="js">
import Task, { STATE_TASK } from '@/model/Task';
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';

export default {
  name: 'editTaskModal',
  data() {
    return {
      name: '',
      datetime: '',
      confirmDeleteMessage: 'Supprimer l\'objectif ?',
    };
  },
  props: {
    task: {},
  },
  methods: {
    edit() {
      const updatedTask = new Task(this.task.id, this.name, this.datetime, '', STATE_TASK.TODO);
      this.$store.dispatch('updateTask', updatedTask);
    },
    confirmDelete() {
      this.$dialog.confirm(this.confirmDeleteMessage)
        .then(() => {
          this.$emit('delete-waiting-task', this.task);
          this.$emit('close');
          this.$store.dispatch('deleteTask', this.task);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    datetime: Datetime,
  },
};
</script>

<style scoped lang="scss">
  .modal-mask .modal-wrapper .modal-container .modal-default-button {
    background-color: #9890E3;
    border: 2px solid #B9B2F4;
    &.dissmiss {
      margin-top: 0;
      background-color: transparent;
      color: #9890E3;
      border: none;
    }
  };

  /*
   * The following styles are auto-applied to elements with
   * transition="modal" when their visibility is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter {
    opacity: 0;
    transition: opacity .3s ease;
  }
  .modal-leave-active {
    opacity: 0;
  }
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
