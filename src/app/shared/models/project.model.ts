import { Task } from './task.model';

export interface Project {
  projectID: number;
  projectName: string;
  clientName: string;
  projectCode: string;
  tasks: Task[];
}
