export enum STATE_TASK {
  TODO = 1,
  DOING = 2,
  DONE = 3
}

class Task {
  public id;
  public name;
  public plannedDate;
  public completionDate;
  public state;
  constructor(id, name, plannedDate, completionDate, state) {
    this.id = id;
    this.name = name;
    this.plannedDate = plannedDate;
    this.completionDate = completionDate;
    this.state = state;
  }
}

export default Task;
