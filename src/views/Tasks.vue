<template>
  <div id="states">
    <newTaskModal
      @new-created-task="newCreatedTask"
      v-if="showModalAdd"
      @close="showModalAdd=false"
    ></newTaskModal>
    <div class="header-state-container">
      <div class="header-state">
        <h2 class="title">Mes objectifs</h2>
        <button class="addTask" @click="showModalAdd = true">+</button>
      </div>
    </div>
    <div class="task-state-container">
      <div class="task-state todo-header">
        <div class="state-name">En attente</div>
        <div class="element">{{waitingList.length}} objectif(s)</div>
      </div>
      <draggable
        :move="confirmTask"
        :disabled="isModalOpen"
        :list="waitingList"
        class="content-state-container"
        v-bind="dragOptions"
        group="taskList"
        @start="drag=true"
        @end="drag=false"
      >
        <transition-group
          class="list-group"
          type="transition"
          :name="!drag ? 'flip-list' : null">
          <waitingTask
            v-for="task in waitingList"
            :task="task"
            :key="task.id"
            @delete-waiting-task="deleteWaitingTask"
            @is-modal-open="changeModalOpen"
            class="task">
          </waitingTask>
        </transition-group>
      </draggable>
    </div>
    <div class="task-state-container">
      <div class="task-state doing-header">
        <div class="state-name">En cours</div>
        <div class="element">{{doingList.length}} objectif(s)</div>
      </div>
      <draggable
        :move="finishTask"
        :list="doingList"
        class="content-state-container"
        v-bind="dragOptions"
        group="taskList"
        @start="drag=true"
        @end="drag=false"
      >
        <transition-group
          class="list-group"
          type="transition"
          :name="!drag ? 'flip-list' : null"
        >
          <doingTask
            v-for="task in doingList"
            :task="task"
            :key="task.id"
            @delete-doing-task="deleteDoingTask"
            @is-modal-open="changeModalOpen"
            class="task">
          </doingTask>
        </transition-group>
      </draggable>
    </div>
    <div class="task-state-container">
      <div class="task-state done-header">
        <div class="state-name">Terminé</div>
        <div class="element">{{doneList.length}} objectif(s)</div>
      </div>
      <draggable
        class="content-state-container"
        :list="doneList"
        v-bind="dragOptions"
        group="taskList"
        @start="drag=true"
        @end="drag=false"
      >
        <transition-group
          class="list-group"
          type="transition"
          :name="!drag ? 'flip-list' : null">
          <div v-for="task in doneList" :key="task.id" class="task done-task">
            <div class="dotted-container">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="task-name">{{task.name}}</div>
            <div class="task-dates">
              <div class="final-date">{{task.plannedDate | moment("DD/MM/YYYY")}}</div>
              <div class="date-left green">
                  Terminé le {{task.completionDate | moment("Do MMMM YYYY")}}
                  à {{task.completionDate | moment("HH:mm")}}
              </div>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script lang="js">
import draggable from 'vuedraggable';
import { STATE_TASK } from '@/model/Task';
import newTaskModal from '@/components/newTaskModal.vue';
import waitingTask from '@/components/waitingTask.vue';
import doingTask from '@/components/doingTask.vue';
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Tasks',
  display: 'Transitions',
  components: {
    waitingTask,
    draggable,
    newTaskModal,
    doingTask,
  },
  data() {
    const { tasks } = this.$store.state;
    return {
      waitingList: tasks.filter(task => task.state === STATE_TASK.TODO),
      doingList: tasks.filter(task => task.state === STATE_TASK.DOING),
      doneList: tasks.filter(task => task.state === STATE_TASK.DONE),
      showModalAdd: false,
      isModalOpen: false,
      drag: false,
      confirmTaskMessage: '<h1>Attention</h1> Une fois cet objectif en cours il sera impossible de le modifier<br/><br/>prêt à relever le défi ?',
      finishTaskMessage: '<h1>Objectif terminé ?</h1>',
    };
  },
  computed: {
    ...mapGetters(['experience']),
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  methods: {
    ...mapActions(['updateExperience']),
    changeModalOpen(bool) {
      this.isModalOpen = bool;
    },
    newCreatedTask(newTask) {
      this.waitingList.push(newTask);
    },
    moment() {
      return moment();
    },
    deleteWaitingTask(deletedTask) {
      this.waitingList.map((task, index) => {
        if (task === deletedTask) {
          this.waitingList.splice(index, 1);
        }
      });
    },
    deleteDoingTask(deletedTask) {
      this.doingList.map((task, index) => {
        if (task === deletedTask) {
          this.doingList.splice(index, 1);
        }
      });
      let removeExperience = this.experience;
      removeExperience.number -= 50;
      this.updateExperience(removeExperience);
    },
    confirmTask(evt) {
      if (evt.relatedContext.list === this.doingList) {
        this.drag = false;
        this.confirmDialog(evt.draggedContext.element);
      }
    },
    confirmDialog(taskDragged) {
      this.$dialog.confirm(this.confirmTaskMessage)
        .then(() => {
          const taskDoing = taskDragged;
          taskDoing.state = STATE_TASK.DOING;
          this.$store.dispatch('updateTask', taskDragged, taskDoing.id);
        })
        .catch((err) => {
          console.log(err);
          this.doingList.map((task, index) => {
            if (task === taskDragged) {
              this.doingList.splice(index, 1);
            }
          });
          this.waitingList.push(taskDragged);
        });
    },
    finishTask(evt) {
      if (evt.relatedContext.list === this.doneList) {
        this.drag = false;
        this.finishDialog(evt.draggedContext.element);
      }
    },
    finishDialog(taskDragged) {
      this.$dialog.confirm(this.finishTaskMessage)
        .then(() => {
          const taskDone = taskDragged;
          taskDone.state = STATE_TASK.DONE;
          taskDone.completionDate = moment().format();
          let addExperience = this.experience;
          addExperience.number += 100;
          this.updateExperience(addExperience);
          this.$store.dispatch('updateTask', taskDragged, taskDone.id);
        })
        .catch((err) => {
          console.log(err);
          this.doneList.map((task, index) => {
            if (task === taskDragged) {
              this.doneList.splice(index, 1);
            }
          });
          this.doingList.push(taskDragged);
        });
    },
  },
};
</script>

<style lang="scss">
.header-state-container {
  height: 50px;
  background-color: $white;
  width: 100%;
  padding: 0 15px;
  .header-state {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 900;
      color: #000;
    }
    .addTask {
      background-color: #87DEAE;
      border: 2px solid #B1F4CF;
      color: $white;
      line-height: 25px;
      font-size: 25px;
      height: 35px;
      flex-basis: 35px;
      flex-shrink: 1;
      border-radius: 3px;
      font-weight: 700;
      outline: none;
    }
  }
}
.task-state {
  padding: 0 15px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $white;
  font-weight: 600;
  &.todo-header {
    background: #9890E3;
  }
  &.doing-header {
    background: linear-gradient(90deg, #9890E3 0%, #8ce6b4 100%);
  }
  &.done-header {
    background: #6ED19A;
  }
  .element {
    font-style: italic;
    font-size: 13px
  }
}

.task {
  height: 65px;
  padding: 14px 15px 14px 30px;
  position: relative;
  &:not(:last-child) {
    padding-bottom: 15px;
    border-bottom: 1px solid #9890E3;
  }
  .dotted-container {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    span {
      display: block;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #9890E3;
      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }
  }
  .task-name {
    margin-bottom: 8px;
    color: $black;
    font-weight: 600;
  }
  .task-dates {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    color: $black;
    .green {
      color: #42b983;
      font-weight: 700;
    }
  }
}

.vdatetime-popup {
  font-family: 'Gotham';
  font-weight: 700;
  border-radius: 4px;

  .vdatetime-popup__header {
    border-radius: 4px 4px 0 0;
    background-color: #9890E3;
  }

  .vdatetime-calendar__month__day--selected > span > span,
  .vdatetime-calendar__month__day--selected:hover > span > span {
    background-color: #9890E3;
  }

  .vdatetime-popup__actions__button,
  .vdatetime-time-picker__item--selected {
    color: #9890E3;
  }
}

.done-task {
  background: #B1F4CF;
  .dotted-container span {
    background-color: #51A76E;
  }
}

.list-group {
  display: block;
  min-height: 30px;
}
.list-group-leave-active{
  display:none!important;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
