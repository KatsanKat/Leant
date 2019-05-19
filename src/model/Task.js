export const STATE_TASK = {
  TODO: 1,
  DOING: 2,
  DONE: 3,
};

class Task {
  constructor(id, name, plannedDate, completionDate, state) {
    this.id = id;
    this.name = name;
    this.plannedDate = plannedDate;
    this.completionDate = completionDate;
    this.state = state;
  }
}

export default Task;
