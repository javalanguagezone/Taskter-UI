import { Task } from './task.model';

export interface Project {
  id: number;
  name: string;
  clientName: string;
  code: string;
  tasks: Task[];
}
