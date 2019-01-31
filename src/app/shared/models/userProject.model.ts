import { Task } from './task.model';

export interface UserProject {
  projectID: number;
  projectName: string;
  clientName: string;
  projectCode: string;
  tasks: Task[];
}
