<template>
  <div id="states">
    <div class="header-state-container">
      <div class="header-state">
        <h2 class="title">Objectifs</h2>
        <button class="addTask" @click="add">+</button>
      </div>
    </div>
    <div class="task-state-container">
      <div class="task-state">
        <div class="state-name">En attente</div>
        <div class="element">{{waitingList.length}} éléments</div>
      </div>
      <draggable
        class="content-state-container"
        :list="waitingList"
        v-bind="dragOptions"
        group="taskList"
        @start="drag=true"
        @end="drag=false"
      >
        <transition-group
          class="list-group"
          type="transition"
          :name="!drag ? 'flip-list' : null">
          <div v-for="task in waitingList" :key="task.id" class="task">
            <div class="task-dates">
              <div class="final-date">{{task.plannedDate}}</div>
              <div class="date-left">3 jours restants</div>
            </div>
            <div class="taskname">{{task.name}}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="task-state-container">
      <div class="task-state">
        <div class="state-name">En cours</div>
        <div class="element">{{doingList.length}} éléments</div>
      </div>
      <draggable
        class="content-state-container"
        :list="doingList"
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
          <div v-for="task in doingList" :key="task.id" class="task">
            <div class="task-dates">
              <div class="final-date">{{task.plannedDate}}</div>
              <div class="date-left">3 jours restants</div>
            </div>
            <div class="taskname">{{task.name}}</div>
          </div>
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
              <div class="final-date">{{task.plannedDate}}</div>
              <div class="date-left">3 jours restants</div>
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

export default {
  name: 'Tasks',
  display: 'Transitions',
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      waitingList: [
        {
          id: 1,
          name: 'Déclarer ses revenus',
          plannedDate: '7 Mars 2019',
          completionDate: '3 jours restants',
        },
        {
          id: 2,
          name: 'Faire la vaisselle',
          plannedDate: '7 Mars 2019',
          completionDate: 'à définir',
        },
        {
          id: 3,
          name: 'Appeler un technicien',
          plannedDate: '7 Mars 2019',
          completionDate: '3 jours restants',
        },
      ],
      doingList: [],
      doneList: [],
    };
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
  },
  methods: {
    add() {
      // console.log(this.$store.state.tasks);
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
