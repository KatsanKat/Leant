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
                <label for="name">Nom</label>
                <input
                  v-model="name"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Refaire le monde...">
              </div>
              <div class="form-input">
                <label for="datetime">Date</label>
                <datetime
                  v-model="datetime"
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
              <button class="modal-default-button" @click="$emit('close'); add();">
                🎉 C'est parti ! 🎉
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
    };
  },
  methods: {
    add() {
      const newTask = new Task(2, this.name, this.datetime, '', STATE_TASK.TODO);
      this.$store.dispatch('addTask', newTask);
      this.$emit('new-created-task', newTask);
    },
  },
  components: {
    datetime: Datetime,
  },
};
</script>

<style lang="scss">
  .form-input {margin-bottom: 25px;}
  label {
    width: 100%;
    font-size: 13px;
    color: $second;
  }
  input[type="text"] {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid $second;
    transition: border-color .3s ease-out;
    padding: 5px 0;
    font-size: 15px;
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
  }
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  .modal-body {
    margin: 20px 0;
  }
  .modal-default-button {
    color: $white;
    font-size: 20px;
    text-align: center;
    width: 100%;
    background-color: #42b983;
    border: none;
    padding: 15px 0;
    font-weight: 700;
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
