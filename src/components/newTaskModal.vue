<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              <h1>Nouvel objectif !</h1>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div class="form-input">
                <label for="name">Ajouter un nouvel objectif</label>
                <input
                  v-model="name"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Mon objectif">
              </div>
              <div class="form-input">
              <label for="datetime">A quelle date ?</label>
                <datetime
                  v-model="datetime"
                  id="datetime"
                  type="datetime"
                  name="datetime"
                  placeholder="JJ // MM // AAAA"
                ></datetime>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close'); add();">
                Commencer
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
  name: 'newTaskModal',
  data() {
    return {
      name: '',
      datetime: '',
      nextId: this.getNextId(),
    };
  },
  methods: {
    add() {
      const newTask = new Task(this.nextId, this.name, this.datetime, '', STATE_TASK.TODO);
      this.$store.dispatch('addTask', newTask);
      this.$emit('new-created-task', newTask);
    },
    getNextId() {
      const tasks = this.$store.getters.getTasks;
      if (tasks.length === 0) { return 1; }
      const taskArray = [];
      tasks.map((task) => { taskArray.push(task.id); });
      const highestId = Math.max(...taskArray);
      return highestId + 1;
    },
  },
  components: {
    datetime: Datetime,
  },
};
</script>

<style lang="scss">
  .form-input {margin-bottom: 25px;}
  input[type="text"] {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 2px solid $black;
    transition: border-color .3s ease-out;
    padding: 9px 0;
    font-size: 17px;
    &:focus {
      border-bottom-color: $black;
      transition: border-color .3s ease-in;
    }
  }
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
      .modal-container {
        width: 330px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        font-family: Helvetica, Arial, sans-serif;
        .modal-header h1 {
          text-align: center;
          font-size: 25px;
          color: $black;
          font-weight: 600;
        }
        .modal-body {
          margin: 20px 0;
          label {
            width: 100%;
            font-size: 16px;
            font-weight: 600;
            color: $black;
          }
        }
        .modal-footer {
          text-align: center;
        }
      .modal-default-button {
        color: $white;
        font-size: 20px;
        text-align: center;
        background-color: #87DEAE;
        border: 2px solid #B1F4CF;
        border-radius: 4px;
        padding: 15px 20px;
        font-weight: 700;
        width: auto;
        min-width: 200px;
      }
      }
    }
  }

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
