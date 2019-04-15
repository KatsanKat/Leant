import Task, {STATE_TASK} from './Task';

const task1 = new Task('Ranger chambre', '2019-09-09', '2019-09-09', STATE_TASK.DOING);
const task2 = new Task('Faire mes devoirs', '2019-09-13', '2019-09-13', STATE_TASK.TODO);
const task3 = new Task('Sortir le chien', '2019-09-27', '2019-09-27', STATE_TASK.DONE);

export default [task1, task2, task3];
