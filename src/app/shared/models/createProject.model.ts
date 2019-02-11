import { Task } from './task.model';
import { Client } from './client.model';

export interface CreateProject {
  projectName: string;
  client: Client;
  projectCode: string;
  tasks: Task[];
  userIds: number[];
}
