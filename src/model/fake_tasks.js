import Task, {STATE_TASK} from './Task';
import leantStore from '@/store/local';

const task1 = new Task(1, 'Ranger chambre', '2019-09-09', '2019-09-09', STATE_TASK.DOING);
const task2 = new Task(2, 'Faire mes devoirs', '2019-09-13', '2019-09-13', STATE_TASK.TODO);
const task3 = new Task(5, 'Sortir le chien', '2019-09-27', '2019-09-27', STATE_TASK.DONE);
let tasks = [task1, task2, task3];

export default tasks;
