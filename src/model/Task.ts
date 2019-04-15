export enum STATE_TASK {
  TODO = 1,
  DOING = 2,
  DONE = 3
}

class Task {
  public name: string;
  public plannedDate: string;
  public completionDate: string;
  public state: STATE_TASK;
  constructor(name: string, plannedDate: string, completionDate: string, state: STATE_TASK) {
    this.name = name;
    this.plannedDate = plannedDate;
    this.completionDate = completionDate;
    this.state = state;
  }
}

export default Task;
