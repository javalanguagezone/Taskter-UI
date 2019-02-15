import { Task } from './task.model';
import { Client } from './client.model';

export interface CreateProject {
  projectName: string;
  clientId: number;
  projectCode: string;
  tasks: Task[];
  userIds: number[];
}
