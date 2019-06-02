<template>
  <div id="states">
    <newTaskModal
      @new-created-task="newCreatedTask"
      v-if="showModalAdd"
      @close="showModalAdd=false"
    ></newTaskModal>
    <div class="header-state-container">
      <div class="header-state">
        <h2 class="title">Objectifs</h2>
        <button class="addTask" @click="showModalAdd = true">+</button>
      </div>
    </div>
    <div class="task-state-container">
      <div class="task-state">
        <div class="state-name">En attente</div>
        <div class="element">{{waitingList.length}} éléments</div>
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
      <div class="task-state">
        <div class="state-name">En cours</div>
        <div class="element">{{doingList.length}} éléments</div>
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
      <div class="task-state">
        <div class="state-name">Terminée</div>
        <div class="element">{{doneList.length}} éléments</div>
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
          <div v-for="task in doneList" :key="task.id" class="task">
            <div class="task-dates">
              <div class="final-date">{{task.plannedDate | moment("DD/MM/YYYY")}}</div>
              <div class="date-left"><span class="green">Terminé !</span></div>
            </div>
            <div class="taskname">{{task.name}}</div>
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

export default {
  name: 'Tasks',
  display: 'Transitions',
  components: {
    waitingTask,
    draggable,
    newTaskModal,
    doingTask,
    // moment,
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
      confirmTaskMessage: 'Une fois cet objectif en cours il sera impossible de le modifier, prêt à relever le défi ?',
      finishTaskMessage: 'Objectif terminé ?',
    };
  },
  methods: {
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
          console.log(this.doneList);
        });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
    // waitingList:{
    //   get() {
    //         return this.allTasks.filter((task) => task.state === STATE_TASK.TODO)
    //     },
    //   set(tasks) {
    //     console.log(tasks);
    //       // this.$store.commit('updateList', task)
    //   }
    // }
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
      background-color: $green;
      color: $white;
      line-height: 1;
      font-size: 20px;
      border: none;
      border-radius: 3px;
      font-weight: 700;
      outline: none;
    }
  }
}
.task-state {
  padding: 0 15px;
  background-color: $main;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task {
  height: 65px;
  padding: 14px 15px;
  background-color: $white;
  .task-dates {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    margin-bottom: 8px;
    .green {
      color: #42b983;
      font-weight: 700;
    }
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
